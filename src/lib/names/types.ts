import { getLocale } from '@agape/locale';

export type CaseType = 'uppercase' | 'lowercase' | 'default';

export interface NamesParams {
  locale?: string;
  case?: CaseType;
  standalone?: boolean;
}

export function createCacheKey(params: NamesParams): string {
  const locale = params.locale ?? getLocale();
  const standalone = params.standalone ?? false;
  const caseType = params.case ?? 'default';
  
  return `${locale}-${standalone}-${caseType}`;
}

export function normalizeParams(params: NamesParams = {}): Required<NamesParams> {
  return {
    locale: params.locale ?? getLocale(),
    case: params.case ?? 'default',
    standalone: params.standalone ?? false,
  };
}
