export class DateTimePatternMatchError extends Error {

  constructor(public message: string = "DateTime does not match pattern") {
    super();
  }
}