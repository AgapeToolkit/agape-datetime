import { getLocale } from '@agape/locale';
import { Names } from './names';
import { CommonEraNamesParams } from './types/common-era-names';

const commonEraNamesRegistry = new Map<string, CommonEraNames>();

export class CommonEraNames extends Names {
  private _long?: readonly string[];
  private _short?: readonly string[];
  private _narrow?: readonly string[];

  get long(): readonly string[] {
    if (this._long) return this._long;

    if (this.case === 'default') {
      this._long = ['Before Common Era', 'Common Era'];
    } else {
      const defaultInstance = CommonEraNames.get({ locale: this.locale, case: 'default' });
      this._long = this.applyCase(defaultInstance.long);
    }
    
    return this._long;
  }

  get short(): readonly string[] {
    if (this._short) return this._short;

    if (this.case === 'default') {
      this._short = ['BCE', 'CE'];
    } else {
      const defaultInstance = CommonEraNames.get({ locale: this.locale, case: 'default' });
      this._short = this.applyCase(defaultInstance.short);
    }
    
    return this._short;
  }

  get narrow(): readonly string[] {
    if (this._narrow) return this._narrow;

    if (this.case === 'default') {
      this._narrow = ['B', 'C'];
    } else {
      const defaultInstance = CommonEraNames.get({ locale: this.locale, case: 'default' });
      this._narrow = this.applyCase(defaultInstance.narrow);
    }
    
    return this._narrow;
  }

  static get(params: CommonEraNamesParams = {}): CommonEraNames {
    const locale = params.locale ?? getLocale();
    const caseType = params.case ?? 'default';
    const key = `${locale}-${caseType}`;
    
    const cached = commonEraNamesRegistry.get(key);
    if (cached) return cached;

    const created = new CommonEraNames({ locale, case: caseType });
    commonEraNamesRegistry.set(key, created);
    return created;
  }
}