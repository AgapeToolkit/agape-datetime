import { DateTimePattern } from './datetime-pattern';

describe('DateTimePattern', () => {
  it('should create an instance', () => {
    expect(new DateTimePattern('YYYY-MM-DD')).toBeTruthy();
  })
})
