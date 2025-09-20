import { TimeZoneNameRecord } from '../interfaces/timezone-name-record';
import { LowerCaseNames } from './lowercase-names';
import { Names } from './names';
import { TimeZoneNames } from './timezone-names';
import { UpperCaseNames } from './uppercase-names';

const uppercaseCaseTimeZoneNamesMap = new Map<Names, UpperCaseTimeZoneNames>();

export class UpperCaseTimeZoneNames extends UpperCaseNames {

  protected _longNamesMap?: Record<string, TimeZoneNameRecord>;

  protected _shortNamesMap?: Record<string, TimeZoneNameRecord>;

  constructor(public readonly names: TimeZoneNames) {
    super(names);
  }

  static for(names: TimeZoneNames): UpperCaseTimeZoneNames {
    const cached = uppercaseCaseTimeZoneNamesMap.get(names);
    if (cached) return cached;

    const created = new UpperCaseTimeZoneNames(names);
    uppercaseCaseTimeZoneNamesMap.set(names, created);
    return created;
  }

  getOffset(variation: 'long' | 'short' | 'narrow', timeZoneName: string) {
    const set = variation === 'long' ? this.longNamesMap : this.shortNamesMap;
    return set[timeZoneName]?.offset;
  }

  get longNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._longNamesMap) return this._longNamesMap;
    this._longNamesMap = Object.fromEntries(
      Object.entries(this.names.longNamesMap).map(
        ([key, value]) => [ key.toLocaleLowerCase(this.names.locale), value ]
      )
    )
    return this._longNamesMap;
  }

  get shortNamesMap(): Record<string, TimeZoneNameRecord> {
    if (this._shortNamesMap) return this._shortNamesMap;
    this._shortNamesMap = Object.fromEntries(
      Object.entries(this.names.shortNamesMap).map(
        ([key, value]) => [ key.toLocaleLowerCase(this.names.locale), value ]
      )
    )
    return this._shortNamesMap;
  }

}