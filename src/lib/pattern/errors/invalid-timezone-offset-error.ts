export class InvalidTimeZoneOffsetError extends Error {

  constructor(message: string = "Invalid time zone offset") {
    super(message);
  }
}
