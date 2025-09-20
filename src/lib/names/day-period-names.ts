import { Names } from './names';

const meridiemNamesRegistry = new Map<string, DayPeriodNames>();

export class DayPeriodNames extends Names {

  protected _long?: readonly string[];

  protected _short?: readonly string[];

  protected _narrow?: readonly string[];

  protected _default?: readonly string[];

  constructor(public locale: string, public standalone: boolean = false) {
    super();
  }

  static forLocale(locale: string): DayPeriodNames {
    const cached = meridiemNamesRegistry.get(locale);
    if (cached) return cached;

    const meridiemNames = new DayPeriodNames(locale);
    meridiemNamesRegistry.set(locale, meridiemNames);
    return meridiemNames;
  }

  get default(): readonly string[] {
    if (this._default) return this._default;
    this._default = this.getDayPeriodNames();
    return this._default;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;
    this._short = this.isEnglish(this.default) ? ['am', 'pm'] : this.default;
    return this._short;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;
    this._long = this.isEnglish(this.default) ? ['a.m.', 'p.m.'] : this.default;
    return this._long;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;
    this._narrow = this.isEnglish(this.default) ? ['a', 'p'] : this.default;
    return this._narrow;
  }

  private getDayPeriodNames() {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { hour: 'numeric', hour12: true, minute: 'numeric', timeZone: 'utc' });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getNamesUsingIntlFormat(intlFormat: Intl.DateTimeFormat): string[] {
    const names: string[] = [];
    for (const i of [6, 18]) {
      const date = new Date(`2025-01-01T${String(i).padStart(2, '0')}:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'dayPeriod').value;
      names.push(name);
    }
    return names;
  }

  private isEnglish(names: readonly string[]): boolean {
    return names[0] === 'AM' && names[1] === 'PM';
  }
}