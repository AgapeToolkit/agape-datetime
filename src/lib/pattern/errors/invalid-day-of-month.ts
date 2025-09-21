export class InvalidDayOfMonth extends Error {
  constructor(message: string = 'Invalid day of month') {
    super(message);
  }
}
