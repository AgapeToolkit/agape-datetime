import { getModifiedValues } from '../../regex-util';
import { DayPeriodNames } from './day-period-names';
import { Names } from './names';

const upperCaseCaseNamesMap = new Map<Names, UpperCaseNames>();

export class UpperCaseNames {

  protected _long?: readonly string[];

  protected _short?: readonly string[];

  protected _narrow?: readonly string[];

  protected _default?: readonly string[];

  constructor(public readonly names: Names | DayPeriodNames) {

  }

  get default(): readonly string[] {
    if (this._default) return this._default;
    if (this.names instanceof DayPeriodNames) {
      this._default = getModifiedValues(this.names.default, 'uppercase', this.names.locale);
    }
    else {
      this._default = [];
    }
    return this._default;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;
    this._long = getModifiedValues(this.names.long, 'uppercase', this.names.locale);
    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;
    this._short = getModifiedValues(this.names.short, 'uppercase', this.names.locale);
    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;
    this._narrow = getModifiedValues(this.names.narrow, 'uppercase', this.names.locale);
    return this._narrow;
  }

  static for(names: Names): UpperCaseNames {
    const cached = upperCaseCaseNamesMap.get(names);
    if (cached) return cached;

    const created = new UpperCaseNames(names);
    upperCaseCaseNamesMap.set(names, created);
    return created;
  }

}