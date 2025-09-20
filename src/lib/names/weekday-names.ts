import { Names } from './names';

const weekdayNamesRegistry = new Map<string, WeekdayNames>();

const standaloneWeekdayNamesRegistry = new Map<string, WeekdayNames>();

export class WeekdayNames extends Names {

  protected _long?: readonly string[];

  protected _short?: readonly string[];

  protected _narrow?: string[];

  constructor(public locale: string, public standalone: boolean = false) {
    super();
  }

  static forLocale(locale: string, standalone: boolean = false): WeekdayNames {
    if (standalone) {
      const cached = standaloneWeekdayNamesRegistry.get(locale);
      if (cached) return cached;

      const weekdayNames = new WeekdayNames(locale, standalone);
      standaloneWeekdayNamesRegistry.set(locale, weekdayNames);
      return weekdayNames;
    }

    const cached = weekdayNamesRegistry.get(locale);
    if (cached) return cached;

    const weekdayNames = new WeekdayNames(locale);
    weekdayNamesRegistry.set(locale, weekdayNames);
    return weekdayNames;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;

    const names = this.standalone
      ? this.getStandaloneWeekdayNames('long')
      : this.getWeekdayNames('long');

    this._long = names;
    return names;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    const names = this.standalone
      ? this.getStandaloneWeekdayNames('short')
      : this.getWeekdayNames('short');

    this._short = names;
    return names;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    const names = this.standalone
      ? this.getStandaloneWeekdayNames('narrow')
      : this.getWeekdayNames('narrow');

    this._narrow = names;
    return names;
  }

  private getStandaloneWeekdayNames(variation: 'long' | 'short' | 'narrow') {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { weekday: variation, timeZone: 'utc' });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getWeekdayNames(variation: 'long' | 'short' | 'narrow') {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { weekday: variation, month: variation, day: 'numeric', timeZone: 'utc' });
    return this.getNamesUsingIntlFormat(intlFormat);
  }

  private getNamesUsingIntlFormat(intlFormat: Intl.DateTimeFormat): string[] {
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(`2025-01-${String(6+i).padStart(2, '0')}T00:00:00.000Z`);
      const parts = intlFormat.formatToParts(date);
      const name = parts.find(part => part.type === 'weekday').value;
      names.push(name);
    }
    return names;
  }

}