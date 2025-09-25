import { getLocale } from '@agape/locale';
import { Names } from './names';
import { EraNamesParams } from './types/era-names-params';

const eraNamesRegistry = new Map<string, EraNames>();

export class EraNames extends Names {
  private _long?: readonly string[];
  private _short?: readonly string[];
  private _narrow?: readonly string[];

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = this.getEraNames('long');
    } else {
      const defaultInstance = EraNames.get({ locale: this.locale, case: 'default' });
      this._long = this.applyCase(defaultInstance.long);
    }

    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = this.getEraNames('short');
    } else {
      const defaultInstance = EraNames.get({ locale: this.locale, case: 'default' });
      this._short = this.applyCase(defaultInstance.short);
    }

    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = this.getEraNames('narrow');
    } else {
      const defaultInstance = EraNames.get({ locale: this.locale, case: 'default' });
      this._narrow = this.applyCase(defaultInstance.narrow);
    }

    return this._narrow;
  }

  private getEraNames(variation: 'long' | 'short' | 'narrow'): readonly string[] {
    const intlFormat = new Intl.DateTimeFormat(this.locale, { era: variation, timeZone: 'utc' });
    const past = this.getEraName(new Date(`-002025-01-01T00:00:00.000Z`), intlFormat);
    const present = this.getEraName(new Date(`+002025-01-01T00:00:00.000Z`), intlFormat);
    return [past, present];
  }

  private getEraName(date: Date, intlFormat: Intl.DateTimeFormat): string {
    const parts = intlFormat.formatToParts(date);
    return parts.find(part => part.type === 'era')?.value || '';
  }

  static get(params: EraNamesParams = {}): EraNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const key = `${locale}-${caseType}`;

    const cached = eraNamesRegistry.get(key);
    if (cached) return cached;

    const created = new EraNames({ locale, case: caseType });
    eraNamesRegistry.set(key, created);
    return created;
  }
}
