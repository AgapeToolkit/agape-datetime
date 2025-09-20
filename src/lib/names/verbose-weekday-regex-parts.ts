import { VerboseDateFormatModifier } from '../../../../types/verbose-date-format-modifier';
import { VerboseWeekdayRegexPartsOptions } from '../../intl-datetime-format/interfaces/verbose-weekday-regex-parts-options';
import { buildRegexFromNames, getModifiedValues } from '../../regex-util';
import { WeekdayNames } from './weekday-names';

const verboseWeekdayRegistry = new Map<VerboseDateFormatModifier | undefined, VerboseWeekdayRegexParts>();

export class VerboseWeekdayRegexParts {

  private _short: string;

  private _long: string;

  private _narrow: string;

  private weekdayNames!: WeekdayNames;

  constructor(public locale: string, public options?: VerboseWeekdayRegexPartsOptions) {
    this.weekdayNames = WeekdayNames.forLocale(locale);
  }

  static forLocale(locale: string, options?: VerboseWeekdayRegexPartsOptions): VerboseWeekdayRegexParts {
    const cached = verboseWeekdayRegistry.get(options?.modifier);
    if (cached) return cached;

    const verboseWeekdayRegexParts = new VerboseWeekdayRegexParts(locale, options);
    verboseWeekdayRegistry.set(options?.modifier, verboseWeekdayRegexParts);
    return verboseWeekdayRegexParts;
  }

  get short(): string {
    if (this._short) return this._short;

    const names = getModifiedValues(this.weekdayNames.short, this.options?.modifier, this.locale);
    this._short = buildRegexFromNames(names);
    return this._short;
  }

  get long(): string {
    if (this._long) return this._long;

    const names = getModifiedValues(this.weekdayNames.long, this.options?.modifier, this.locale);
    this._long = buildRegexFromNames(names);
    return this._long;
  }

  get narrow(): string {
    if (this._narrow) return this._narrow;

    const names = getModifiedValues(this.weekdayNames.narrow, this.options?.modifier, this.locale);
    this._narrow = buildRegexFromNames(Array.from(new Set(names)));
    return this._narrow;
  }

}