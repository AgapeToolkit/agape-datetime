import { MonthNames } from './month-names';

const monthNumbersRegistry = new Map<string, MonthNumbers>();

const standaloneMonthNumbersRegistry = new Map<string, MonthNumbers>();

export class MonthNumbers {

  private monthNames!: MonthNames;

  private _long?: Record<string, number>;

  private _short?: Record<string, number>;

  private _narrow?: Record<string, number>;

  constructor(public locale: string, public standalone: boolean = false) {
    this.monthNames = MonthNames.forLocale(locale, standalone);
  }

  static forLocale(locale: string, standalone: boolean = false): MonthNumbers {
    if (standalone) {
      const cached = standaloneMonthNumbersRegistry.get(locale);
      if (cached) return cached;

      const monthNumbers = new MonthNumbers(locale, true);
      standaloneMonthNumbersRegistry.set(locale, monthNumbers);
      return monthNumbers;
    }

    const cached = monthNumbersRegistry.get(locale);
    if (cached) return cached;

    const monthNumbers = new MonthNumbers(locale);
    monthNumbersRegistry.set(locale, monthNumbers);
    return monthNumbers;
  }

  get long(): Record<string, number> {
    if (this._long) return this._long;

    const record: Record<string, number> = {};
    this.monthNames.long.forEach(
      (name, index) => {
        record[name.toLowerCase()] ??= index + 1;
      }
    )

    this._long = record;
    return record;
  }

  get short(): Record<string, number> {
    if (this._short) return this._short;

    const record: Record<string, number> = {};
    this.monthNames.short.forEach(
      (name, index) => {
        record[name.toLowerCase()] ??= index + 1;
      }
    )

    this._short = record;
    return record;
  }

  get narrow(): Record<string, number> {
    if (this._narrow) return this._narrow;

    const record: Record<string, number> = {};
    this.monthNames.narrow.forEach(
      (name, index) => {
        record[name.toLowerCase()] ??= index + 1;
      }
    )

    this._narrow = record;
    return record;
  }

}