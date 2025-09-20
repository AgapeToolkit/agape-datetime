import { Names } from './names';

const eraNamesRegistry = new Map<string, EraNames>();

export class EraNames extends Names {

  protected _long?: readonly string[];

  protected _short?: readonly string[];

  protected _narrow?: readonly string[];

  constructor(public locale: string) {
    super();
  }

  static forLocale(locale: string): EraNames {
    const cached = eraNamesRegistry.get(locale);
    if (cached) return cached;

    const monthNames = new EraNames(locale);
    eraNamesRegistry.set(locale, monthNames);
    return monthNames;
  }

  get long(): readonly string[] {
    if (this._long) return this._long;
    this._long= this.getEraNames('long');
    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;
    this._short= this.getEraNames('short');
    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;
    this._narrow= this.getEraNames('narrow');
    return this._narrow;
  }

  private getEraNames(variation: 'long' | 'short' | 'narrow'): readonly string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { era: variation });
    const past = this.getEraName(new Date(`-002025-01-01T00:00:00.000Z`), intlFormat);
    const present = this.getEraName(new Date(`+002025-01-01T00:00:00.000Z`), intlFormat);
    return [past, present];
  }

  private getEraName(date: Date, intlFormat: Intl.DateTimeFormat): string {
    const parts = intlFormat.formatToParts(date);
    return parts.find(part => part.type === 'era').value;
  }

}