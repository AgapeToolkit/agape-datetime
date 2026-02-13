export class InvalidTimeZoneNameError extends Error {

  constructor(public message: string) {
    super();
  }
}