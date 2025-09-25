import { getLocale } from '@agape/locale';
import { Names } from './names';
import { DayPeriodNamesParams } from './types/day-period-names-params';

const dayPeriodNamesRegistry = new Map<string, DayPeriodNames>();

export class DayPeriodNames extends Names {
  public readonly standalone: boolean;

  private _long?: readonly string[];
  private _short?: readonly string[];
  private _narrow?: readonly string[];
  private _default?: readonly string[];

  constructor(params: DayPeriodNamesParams = {}) {
    super(params);
    this.standalone = params.standalone ?? false;
  }

  get default(): readonly string[] {
    if (this._default) return this._default;

    if (this.case === 'default') {
      this._default = this.getDayPeriodNames();
    } else {
      const defaultInstance = DayPeriodNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._default = this.applyCase(defaultInstance.default);
    }

    return this._default;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = this.isEnglish(this.default) ? ['am', 'pm'] : this.default;
    } else {
      const defaultInstance = DayPeriodNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._short = this.isEnglish(defaultInstance.default) ? ['am', 'pm'] : defaultInstance.default;
      this._short = this.applyCase(this._short);
    }

    return this._short;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = this.isEnglish(this.default) ? ['a.m.', 'p.m.'] : this.default;
    } else {
      const defaultInstance = DayPeriodNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._long = this.isEnglish(defaultInstance.default) ? ['a.m.', 'p.m.'] : defaultInstance.default;
      this._long = this.applyCase(this._long);
    }

    return this._long;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = this.isEnglish(this.default) ? ['a', 'p'] : this.default;
    } else {
      const defaultInstance = DayPeriodNames.get({ locale: this.locale, standalone: this.standalone, case: 'default' });
      this._narrow = this.isEnglish(defaultInstance.default) ? ['a', 'p'] : defaultInstance.default;
      this._narrow = this.applyCase(this._narrow);
    }

    return this._narrow;
  }

  private getDayPeriodNames() {
    const intlFormat = new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
      timeZone: 'utc'
    });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getNamesUsingIntlFormat(intlFormat: Intl.DateTimeFormat): string[] {
    const names: string[] = [];
    for (const i of [6, 18]) {
      const date = new Date(`2025-01-01T${String(i).padStart(2, '0')}:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'dayPeriod')?.value;
      if (name) names.push(name);
    }
    return names;
  }

  private isEnglish(names: readonly string[]): boolean {
    return names[0] === 'AM' && names[1] === 'PM';
  }

  static get(params: DayPeriodNamesParams = {}): DayPeriodNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const standalone = params.standalone ?? false;
    const key = `${locale}-${standalone}-${caseType}`;

    const cached = dayPeriodNamesRegistry.get(key);
    if (cached) return cached;

    const created = new DayPeriodNames({ locale, case: caseType, standalone });
    dayPeriodNamesRegistry.set(key, created);
    return created;
  }

}
