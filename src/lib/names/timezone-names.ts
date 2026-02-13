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
  private _shortGeneric?: readonly string[];
  private _shortGenericNamesMap?: Record<string, TimeZoneNameRecord>;
  private _longGeneric?: readonly string[];
  private _longGenericNamesMap?: Record<string, TimeZoneNameRecord>;
  private _shortOffset?: readonly string[];
  private _shortOffsetNamesMap?: Record<string, TimeZoneNameRecord>;
  private _longOffset?: readonly string[];
  private _longOffsetNamesMap?: Record<string, TimeZoneNameRecord>;

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

  get shortGeneric(): readonly string[] {
    if (this._shortGeneric) return this._shortGeneric;

    if (this.case === 'default') {
      this._shortGeneric = Object.keys(this.shortGenericNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._shortGeneric = this.applyCase(defaultInstance.shortGeneric);
    }

    return this._shortGeneric;
  }

  get shortGenericNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._shortGenericNamesMap) return this._shortGenericNamesMap;
    this._shortGenericNamesMap = this.getTimeZoneNames('shortGeneric');
    return this._shortGenericNamesMap;
  }

  get longGeneric(): readonly string[] {
    if (this._longGeneric) return this._longGeneric;

    if (this.case === 'default') {
      this._longGeneric = Object.keys(this.longGenericNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._longGeneric = this.applyCase(defaultInstance.longGeneric);
    }

    return this._longGeneric;
  }

  get longGenericNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._longGenericNamesMap) return this._longGenericNamesMap;
    this._longGenericNamesMap = this.getTimeZoneNames('longGeneric');
    return this._longGenericNamesMap;
  }

  get shortOffset(): readonly string[] {
    if (this._shortOffset) return this._shortOffset;

    if (this.case === 'default') {
      this._shortOffset = Object.keys(this.shortOffsetNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._shortOffset = this.applyCase(defaultInstance.shortOffset);
    }

    return this._shortOffset;
  }

  get shortOffsetNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._shortOffsetNamesMap) return this._shortOffsetNamesMap;
    this._shortOffsetNamesMap = this.getTimeZoneNames('shortOffset');
    return this._shortOffsetNamesMap;
  }

  get longOffset(): readonly string[] {
    if (this._longOffset) return this._longOffset;

    if (this.case === 'default') {
      this._longOffset = Object.keys(this.longOffsetNamesMap);
    } else {
      const defaultInstance = TimeZoneNames.get({ locale: this.locale, case: 'default' });
      this._longOffset = this.applyCase(defaultInstance.longOffset);
    }

    return this._longOffset;
  }

  get longOffsetNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._longOffsetNamesMap) return this._longOffsetNamesMap;
    this._longOffsetNamesMap = this.getTimeZoneNames('longOffset');
    return this._longOffsetNamesMap;
  }

  getOffset(variation: 'long' | 'short' | 'narrow' | 'shortGeneric' | 'longGeneric' | 'shortOffset' | 'longOffset', timeZoneName: string) {
    let set: Record<string, TimeZoneNameRecord>;
    switch (variation) {
      case 'long':
        set = this.longNamesMap;
        break;
      case 'short':
        set = this.shortNamesMap;
        break;
      case 'narrow':
        set = this.shortNamesMap; // narrow uses short names
        break;
      case 'shortGeneric':
        set = this.shortGenericNamesMap;
        break;
      case 'longGeneric':
        set = this.longGenericNamesMap;
        break;
      case 'shortOffset':
        set = this.shortOffsetNamesMap;
        break;
      case 'longOffset':
        set = this.longOffsetNamesMap;
        break;
    }
    return set[timeZoneName]?.offset;
  }

  getTimeZoneId(variation: 'long' | 'short' | 'narrow' | 'shortGeneric' | 'longGeneric' | 'shortOffset' | 'longOffset', timeZoneName: string, date: Date): string | undefined {
    let map: Record<string, TimeZoneNameRecord>;
    let intlVariation: string;
    
    switch (variation) {
      case 'long':
        map = this.longNamesMap;
        intlVariation = 'long';
        break;
      case 'short':
        map = this.shortNamesMap;
        intlVariation = 'short';
        break;
      case 'narrow':
        map = this.shortNamesMap; // narrow uses short names
        intlVariation = 'short';
        break;
      case 'shortGeneric':
        map = this.shortGenericNamesMap;
        intlVariation = 'shortGeneric';
        break;
      case 'longGeneric':
        map = this.longGenericNamesMap;
        intlVariation = 'longGeneric';
        break;
      case 'shortOffset':
        map = this.shortOffsetNamesMap;
        intlVariation = 'shortOffset';
        break;
      case 'longOffset':
        map = this.longOffsetNamesMap;
        intlVariation = 'longOffset';
        break;
    }
    
    const record: TimeZoneNameRecord = map[timeZoneName];
    for (const timeZone of record.timeZones) {
      const intl = new Intl.DateTimeFormat(this.locale, { timeZone, timeZoneName: intlVariation as any });
      const name = intl.formatToParts(date).find(part => part.type === 'timeZoneName')?.value;
      if (name === timeZoneName) return timeZone;
    }
    return undefined;
  }

  private getTimeZoneNames(variation: 'long' | 'short' | 'shortGeneric' | 'longGeneric' | 'shortOffset' | 'longOffset'): Record<string, TimeZoneNameRecord> {
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

  private getTimeZoneNameDetails(variation: 'long' | 'short' | 'shortGeneric' | 'longGeneric' | 'shortOffset' | 'longOffset'): TimeZoneNameDetail[] {
    const timeZoneNameDetails: TimeZoneNameDetail[] = [];

    if (hasTemporal()) {
      const winter = Temporal.Instant.from('2025-01-01T00:00:00.000Z');
      const summer = Temporal.Instant.from('2025-01-01T00:00:00.000Z');

      for (const timeZone of (Intl as any).supportedValuesOf('timeZone')) {
        const intlFormat = new Intl.DateTimeFormat(this.locale, { timeZone, timeZoneName: variation as any });
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

      for (const timeZone of Intl.supportedValuesOf('timeZone')) {
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
