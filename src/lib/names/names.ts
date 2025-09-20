import { NamesParams, normalizeParams } from './types';

export abstract class Names {
  public readonly locale: string;
  public readonly case: 'uppercase' | 'lowercase' | 'default';

  constructor(params: NamesParams = {}) {
    const normalized = normalizeParams(params);
    this.locale = normalized.locale;
    this.case = normalized.case;
  }

  protected applyCase(names: readonly string[]): readonly string[] {
    switch (this.case) {
      case 'uppercase':
        return names.map(name => name.toLocaleUpperCase(this.locale));
      case 'lowercase':
        return names.map(name => name.toLocaleLowerCase(this.locale));
      default:
        return names;
    }
  }
}