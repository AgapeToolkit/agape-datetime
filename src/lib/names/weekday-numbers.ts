import { WeekdayNames } from './weekday-names';

const weekdayNumbersRegistry = new Map<string, WeekdayNumbers>();

export class WeekdayNumbers {

  private weekdayNames!: WeekdayNames;

  private _long?: Record<string, number>;

  private _short?: Record<string, number>;

  private _narrow?: Record<string, number>;

  constructor(public locale: string) {
    this.weekdayNames = WeekdayNames.get({ locale });
  }

  static forLocale(locale: string): WeekdayNumbers {
    const cached = weekdayNumbersRegistry.get(locale);
    if (cached) return cached;

    const weekdayNumbers = new WeekdayNumbers(locale);
    weekdayNumbersRegistry.set(locale, weekdayNumbers);
    return weekdayNumbers;
  }

  get long(): Record<string, number> {
    if (this._long) return this._long;

    const record: Record<string, number> = {};
    this.weekdayNames.long.forEach(
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
    this.weekdayNames.short.forEach(
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
    this.weekdayNames.narrow.forEach(
      (name, index) => {
        record[name.toLowerCase()] ??= index + 1;
      }
    )

    this._narrow = record;
    return record;
  }

}

