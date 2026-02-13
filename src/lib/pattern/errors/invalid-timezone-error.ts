export class InvalidTimeZoneError extends Error {

  constructor(message: string = "Must be a valid time zone") {
    super(message);
  }
}
