import { EraNames } from './era-names';
import { Names } from './names';

const commonEraNamesRegistry = new Map<string, CommonEraNames>();

export class CommonEraNames extends Names {

  protected _long?: readonly string[] = ['Before Common Era', 'Common Era'];

  protected _short?: readonly string[] = ['BCE', 'CE'];

  protected _narrow?: readonly string[] = ['B', 'C'];

  get long(): readonly string[] {
    return this._long;
  }

  get short(): readonly string[] {
    return this._short;
  }

  get narrow(): readonly string[] {
    return this._narrow;
  }

  constructor(public readonly locale: string) {
    super();
    this.locale = locale;
  }

  static forLocale(locale: string): CommonEraNames {
    const cached = commonEraNamesRegistry.get(locale);
    if (cached) return cached;

    const created = new CommonEraNames(locale);
    commonEraNamesRegistry.set(locale, created);
    return created;
  }
}