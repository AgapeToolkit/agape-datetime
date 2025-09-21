
let localWeekdaySupported: boolean | null = null;

export function checkLocalWeekdaySupport() {
  if (localWeekdaySupported !== null) return localWeekdaySupported;

  try {
    new (Intl as any).Locale('en-US');
    localWeekdaySupported = true;
  } catch {
    localWeekdaySupported = false;
  }

  return localWeekdaySupported;
}

// 1=Monday … 7=Sunday
export function getFirstDayOfWeek(locale: string) {
  const loc = new (Intl as any).Locale(locale);
  return loc?.weekInfo?.firstDay;
}

export function isoWeekdayToLocalWeekday(isoWeekday: number, locale: string): number {
  if (isoWeekday < 1 || isoWeekday > 7) {
    throw new RangeError("isoWeekday must be between 1 (Monday) and 7 (Sunday)");
  }
  const firstDayOfWeek = getFirstDayOfWeek(locale);
  return ((isoWeekday - firstDayOfWeek + 7) % 7) + 1;
}

export function localWeekdayToIsoWeekday(localWeekday: number, locale: string): number {
  if (localWeekday < 1 || localWeekday > 7) {
    throw new RangeError("localWeekday must be between 1 and 7");
  }
  const firstDayOfWeek = getFirstDayOfWeek(locale);
  return ((localWeekday + firstDayOfWeek - 2 + 7) % 7) + 1;
}


function getIsoDayOfWeek(date: Date) {
  return date.getDay() === 0 ? 7 : date.getDay();
}

export function isValidDayOfWeek<T extends {year?: number, month?: number, day?: number, weekday?: number}>(dateParts: T): { valid: boolean, correctDayOfWeek: number } {
  const {year, month, day, weekday} = dateParts;
  if (year === undefined || month === undefined || day === undefined || weekday === undefined) return false;

  const date = new Date(year, month - 1, day);
  const dow = getIsoDayOfWeek(date);
  if (dow === weekday) return { valid: true, correctDayOfWeek: dow };
  return { valid: false, correctDayOfWeek: dow };
}
