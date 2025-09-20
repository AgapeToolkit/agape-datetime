import { VerboseDateFormatModifier } from '../../../../types/verbose-date-format-modifier';
import { VerboseMonthRegexPartsOptions } from '../../intl-datetime-format/interfaces/verbose-month-regex-parts-options';
import { buildRegexFromNames, getModifiedValues } from '../../regex-util';
import { MonthNames } from './month-names';

const verboseMonthRegexPartsRegistry = new Map<string, Map<VerboseDateFormatModifier | undefined, VerboseMonthRegexParts>>();

const verboseStandaloneMonthRegexPartsRegistry = new Map<string, Map<VerboseDateFormatModifier | undefined, VerboseMonthRegexParts>>();

export class VerboseMonthRegexParts {

  private _short: string;

  private _long: string;

  private _narrow: string;

  private monthNames!: MonthNames;

  constructor(public locale: string, public options?: VerboseMonthRegexPartsOptions) {
    this.monthNames = MonthNames.forLocale(locale, options?.standalone);
  }

  static forLocale(locale: string, options?: VerboseMonthRegexPartsOptions): VerboseMonthRegexParts {
    let localeRegistry: Map<VerboseDateFormatModifier | undefined, VerboseMonthRegexParts>;

    if (options?.standalone) {
      localeRegistry = verboseStandaloneMonthRegexPartsRegistry.get(locale);
      if (!localeRegistry) {
        localeRegistry = new Map<VerboseDateFormatModifier | undefined, VerboseMonthRegexParts>();
        verboseStandaloneMonthRegexPartsRegistry.set(locale, localeRegistry);
      }
    }
    else {
      localeRegistry = verboseMonthRegexPartsRegistry.get(locale);
      if (!localeRegistry) {
        localeRegistry = new Map<VerboseDateFormatModifier | undefined, VerboseMonthRegexParts>();
        verboseMonthRegexPartsRegistry.set(locale, localeRegistry);
      }
    }

    const cached = localeRegistry.get(options?.modifier);
    if (cached) return cached;

    const verboseMonthRegexParts = new VerboseMonthRegexParts(locale, options);
    localeRegistry.set(options?.modifier, verboseMonthRegexParts);
    return verboseMonthRegexParts;
  }

  get short(): string {
    if (this._short) return this._short;

    const names = getModifiedValues(this.monthNames.short, this.options?.modifier, this.locale);
    this._short = buildRegexFromNames(names);
    return this._short;
  }

  get long(): string {
    if (this._long) return this._long;

    const names = getModifiedValues(this.monthNames.long, this.options?.modifier, this.locale);
    this._long = buildRegexFromNames(names);
    return this._long;
  }

  get narrow(): string {
    if (this._narrow) return this._narrow;

    const names = getModifiedValues(this.monthNames.narrow, this.options?.modifier, this.locale);
    this._narrow = buildRegexFromNames(Array.from(new Set(names)));
    return this._narrow;
  }
}