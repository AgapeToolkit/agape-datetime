import { getLocale } from '@agape/locale';
import { Names } from './names';
import { MonthNamesParams } from './types/month-names-params';

const monthNamesRegistry = new Map<string, MonthNames>();

export class MonthNames extends Names {
  public readonly standalone: boolean;

  private _long?: readonly string[];
  private _short?: readonly string[];
  private _narrow?: readonly string[];

  constructor(params: MonthNamesParams = {}) {
    super(params);
    this.standalone = params.standalone ?? false;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = this.getMonthNames('long');
    } else {
      const defaultInstance = MonthNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._long = this.applyCase(defaultInstance.long);
    }

    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = this.getMonthNames('short');
    } else {
      const defaultInstance = MonthNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._short = this.applyCase(defaultInstance.short);
    }

    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = this.getMonthNames('narrow');
    } else {
      const defaultInstance = MonthNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._narrow = this.applyCase(defaultInstance.narrow);
    }

    return this._narrow;
  }

  private getMonthNames(variation: 'long' | 'short' | 'narrow'): readonly string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, {
      month: variation,
      ...(!this.standalone && { year: 'numeric', day: 'numeric' }),
      calendar: 'gregory',
      timeZone: 'utc'
    });

    const names: string[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(`2025-${String(i + 1).padStart(2, '0')}-01T00:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'month')?.value;
      if (name) names.push(name);
    }

    return names;
  }

  static get(params: MonthNamesParams = {}): MonthNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const standalone = params.standalone ?? false;
    const key = `${locale}-${standalone}-${caseType}`;

    const cached = monthNamesRegistry.get(key);
    if (cached) return cached;

    const created = new MonthNames({ locale, case: caseType, standalone });
    monthNamesRegistry.set(key, created);
    return created;
  }
}
