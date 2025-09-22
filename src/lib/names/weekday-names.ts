import { getLocale } from '@agape/locale';
import { Names } from './names';
import { WeekdayNamesParams } from './types/weekday-names';

const weekdayNamesRegistry = new Map<string, WeekdayNames>();

export class WeekdayNames extends Names {
  public readonly standalone: boolean;

  private _long?: readonly string[];
  private _short?: readonly string[];
  private _narrow?: readonly string[];

  constructor(params: WeekdayNamesParams = {}) {
    super(params);
    this.standalone = params.standalone ?? false;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = this.getWeekdayNames('long');
    } else {
      const defaultInstance = WeekdayNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._long = this.applyCase(defaultInstance.long);
    }

    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = this.getWeekdayNames('short');
    } else {
      const defaultInstance = WeekdayNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._short = this.applyCase(defaultInstance.short);
    }

    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = this.getWeekdayNames('narrow');
    } else {
      const defaultInstance = WeekdayNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._narrow = this.applyCase(defaultInstance.narrow);
    }

    return this._narrow;
  }

  private getWeekdayNames(variation: 'long' | 'short' | 'narrow'): readonly string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, {
      weekday: variation,
      ...(this.standalone && { calendar: 'gregory' }),
      timeZone: 'utc'
    });

    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(`2025-01-${String(6 + i).padStart(2, '0')}T00:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'weekday')?.value;
      if (name) names.push(name);
    }

    return names;
  }

  static get(params: WeekdayNamesParams = {}): WeekdayNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const standalone = params.standalone ?? false;
    const key = `${locale}-${standalone}-${caseType}`;

    const cached = weekdayNamesRegistry.get(key);
    if (cached) return cached;

    const created = new WeekdayNames({ locale, case: caseType, standalone });
    weekdayNamesRegistry.set(key, created);
    return created;
  }

}
