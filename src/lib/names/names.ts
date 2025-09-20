import { getLocale } from '@agape/locale';

export abstract class Names {
  public readonly locale: string;
  public readonly case: 'uppercase' | 'lowercase' | 'default';

  constructor(params: { locale?: string; case?: 'uppercase' | 'lowercase' | 'default' } = {}) {
    this.locale = params.locale ?? getLocale();
    this.case = params.case ?? 'default';
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