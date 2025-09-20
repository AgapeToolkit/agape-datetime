import { Names } from './names';

const monthNamesRegistry = new Map<string, MonthNames>();

const standaloneMonthNamesRegistry = new Map<string, MonthNames>();

export class MonthNames extends Names {

  protected _long?: readonly string[];

  protected _short?: readonly string[];

  protected _narrow?: readonly string[];

  constructor(public locale: string, public standalone: boolean = false) {
    super();
  }

  static forLocale(locale: string, standalone: boolean = false): MonthNames {
    if (standalone) {
      const cached = standaloneMonthNamesRegistry.get(locale);
      if (cached) return cached;

      const monthNames = new MonthNames(locale, standalone);
      standaloneMonthNamesRegistry.set(locale, monthNames);
      return monthNames;
    }

    const cached = monthNamesRegistry.get(locale);
    if (cached) return cached;

    const monthNames = new MonthNames(locale);
    monthNamesRegistry.set(locale, monthNames);
    return monthNames;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;

    const names = this.standalone
      ? this.getStandaloneMonthNames('long')
      : this.getMonthNames('long');

    this._long = names;
    return names;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    const names = this.standalone
      ? this.getStandaloneMonthNames('short')
      : this.getMonthNames('short');

    console.log("Month names", names);

    this._short = names;
    return names;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    const names = this.standalone
      ? this.getStandaloneMonthNames('narrow')
      : this.getMonthNames('narrow');

    this._narrow = names;
    return names;
  }

  private getStandaloneMonthNames(variation: 'long' | 'short' | 'narrow'): string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { month: variation, timeZone: 'UTC' });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getMonthNames(variation: 'long' | 'short' | 'narrow'): string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: variation, day: 'numeric', timeZone: 'UTC' });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getNamesUsingIntlFormat(intlFormat: Intl.DateTimeFormat): string[] {
    const names: string[] = [];
    for (let m = 0; m < 12; m++) {
      const date = new Date(`2025-${String(m+1).padStart(2, '0')}-01T00:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'month').value;
      names.push(name);
    }
    return names;
  }

}