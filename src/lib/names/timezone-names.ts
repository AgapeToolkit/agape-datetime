import { getOffsetLegacyDate, getOffsetTemporal } from '../util/private/offsets';
import { getLocale } from '@agape/locale';
import { hasTemporal, Temporal } from '@agape/temporal';
import { Names } from './names';
import { TimeZoneNamesParams } from './types/timezone-names-params';
import { TimeZoneNameRecord } from './types/timezone-name-record';

const timeZoneNamesRegistry = new Map<string, TimeZoneNames>();

interface TimeZoneNameDetail {
  timeZoneName: string;
  timeZone: string;
  offset: string;
}
export class TimeZoneNames extends Names {
  private _long?: readonly string[];
  private _longNamesMap?: Record<string, TimeZoneNameRecord>;
  private _short?: readonly string[];
  private _shortNamesMap?: Record<string, TimeZoneNameRecord>;
  private _narrow?: readonly string[];

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = Object.keys(this.longNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._long = this.applyCase(defaultInstance.long);
    }

    return this._long;
  }

  get longNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._longNamesMap) return this._longNamesMap;
    this._longNamesMap = this.getTimeZoneNames('long');
    return this._longNamesMap;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = Object.keys(this.shortNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._short = this.applyCase(defaultInstance.short);
    }

    return this._short;
  }

  get shortNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._shortNamesMap) return this._shortNamesMap;
    this._shortNamesMap = this.getTimeZoneNames('short');
    return this._shortNamesMap;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = this._short || [];
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._narrow = this.applyCase(defaultInstance.narrow);
    }

    return this._narrow;
  }

  getOffset(variation: 'long' | 'short' | 'narrow', timeZoneName: string) {
    const set = variation === 'long' ? this.longNamesMap : this.shortNamesMap;
    return set[timeZoneName]?.offset;
  }

  getTimeZoneId(variation: 'long' | 'short' | 'narrow', timeZoneName: string, date: Date): string | undefined {
    const map = variation === 'long' ? this.longNamesMap : this.shortNamesMap;
    const record: TimeZoneNameRecord = map[timeZoneName];
    const intlVariation = variation === 'long' ? 'long': 'short';
    for (const timeZone of record.timeZones) {
      const intl = new Intl.DateTimeFormat(this.locale, { timeZone, timeZoneName: intlVariation });
      const name = intl.formatToParts(date).find(part => part.type === 'timeZoneName')?.value;
      if (name === timeZoneName) return timeZone;
    }
    return undefined;
  }

  private getTimeZoneNames(variation: 'long' | 'short'): Record<string, TimeZoneNameRecord> {
    const timeZoneNameDetails = this.getTimeZoneNameDetails(variation);
    const timeZoneNames: Record<string, TimeZoneNameRecord> = {};
    for (const timeZoneNameDetail of timeZoneNameDetails) {
      const nameRecord: TimeZoneNameRecord = timeZoneNames[timeZoneNameDetail.timeZoneName] ??= {
        timeZoneName: timeZoneNameDetail.timeZoneName,
        offset: timeZoneNameDetail.offset,
        timeZones: []
      };
      nameRecord.timeZones.push(timeZoneNameDetail.timeZone);
    }

    return timeZoneNames;
  }

  private getTimeZoneNameDetails(variation: 'long' | 'short'): TimeZoneNameDetail[] {
    const timeZoneNameDetails: TimeZoneNameDetail[] = [];

    if (hasTemporal()) {
      const winter = Temporal.Instant.from('2025-01-01T00:00:00.000Z');
      const summer = Temporal.Instant.from('2025-01-01T00:00:00.000Z');

      for (const timeZone of (Intl as any).supportedValuesOf('timeZone')) {
        const intlFormat = new Intl.DateTimeFormat(this.locale, { timeZone, timeZoneName: variation });
        const winterTimeZoneNameDetails = this.getTimeZoneNameDetailInstant(intlFormat, timeZone, winter);
        const summerTimeZoneNameDetails = this.getTimeZoneNameDetailInstant(intlFormat, timeZone, summer);
        if (winterTimeZoneNameDetails.timeZoneName === summerTimeZoneNameDetails.timeZoneName) {
          timeZoneNameDetails.push(winterTimeZoneNameDetails);
        }
        else {
          timeZoneNameDetails.push(winterTimeZoneNameDetails, summerTimeZoneNameDetails);
        }
      }
    }
    else {
      const winter = new Date('2025-01-01T00:00:00.000Z');
      const summer =  new Date('2025-07-15T00:00:00.000Z');

      for (const timeZone of (Intl as any).supportedValuesOf('timeZone')) {
        const intlFormat = new Intl.DateTimeFormat(this.locale, { timeZone, timeZoneName: variation });
        const winterTimeZoneNameDetails = this.getTimeZoneNameDetailLegacy(intlFormat, timeZone, winter);
        const summerTimeZoneNameDetails = this.getTimeZoneNameDetailLegacy(intlFormat, timeZone, summer);
        if (winterTimeZoneNameDetails.timeZoneName === summerTimeZoneNameDetails.timeZoneName) {
          timeZoneNameDetails.push(winterTimeZoneNameDetails);
        }
        else {
          timeZoneNameDetails.push(winterTimeZoneNameDetails, summerTimeZoneNameDetails);
        }
      }
    }

    return timeZoneNameDetails;
  }

  private getTimeZoneNameDetailLegacy(intlFormat: Intl.DateTimeFormat, timeZone: string, date: Date): TimeZoneNameDetail {
    return {
      timeZone,
      timeZoneName: this.getTimeZoneName(intlFormat, date),
      offset: getOffsetLegacyDate(date, timeZone),
    }
  }

  private getTimeZoneNameDetailInstant(intlFormat: Intl.DateTimeFormat, timeZone: string, instant: any): TimeZoneNameDetail {
    return {
      timeZone,
      timeZoneName: this.getTimeZoneName(intlFormat, instant),
      offset: getOffsetTemporal(instant, timeZone),
    }
  }

  private getTimeZoneName(intlFormat: Intl.DateTimeFormat, date: Date) {
    const parts = intlFormat.formatToParts(date);
    return parts.find(part => part.type === 'timeZoneName')?.value || '';
  }

  static get(params: TimeZoneNamesParams = {}): TimeZoneNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const key = `${locale}-${caseType}`;

    const cached = timeZoneNamesRegistry.get(key);
    if (cached) return cached;

    const created = new TimeZoneNames({ locale, case: caseType });
    timeZoneNamesRegistry.set(key, created);
    return created;
  }

}
