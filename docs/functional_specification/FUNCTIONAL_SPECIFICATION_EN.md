## ezDatetime Functional Specification

- [x] **Feature 1: Create ezDatetime Objects**
  - Use the `ezDatetime` class to create `ezDatetime` objects.
  - By default, it returns an `ezDatetime` object with the current date and time at the current location.
  - It can also return an `ezDatetime` object with a specified date and time using the `targetDate` and `timezone` parameters.

- [x] **Feature 2: Set Timezone**
  - Use the `setTimezone(timezone)` method to set the timezone of an `ezDatetime` object.
  - The `timezone` parameter should be a string representing the IANA timezone identifier.
  - The `ezDatetime` object's date and time will be displayed according to the set timezone.

- [x] **Feature 3: Date Formatting**
  - Use the `format(formatString)` method to format the date and time of an `ezDatetime` object according to a desired format.
  - The `formatString` parameter should be a string that includes format specifiers.
  - Supported format specifiers include 'yyyy' (year), 'MM' (month), 'dd' (day), 'HH' (hour), 'mm' (minute), 'ss' (second), and more.
  - The method returns the formatted date and time as a string.

- [x] **Feature 4: Date Manipulation**
  - Use the `calculate(operation)` method to perform date operations such as addition or subtraction on an `ezDatetime` object.
  - The `operation` parameter should be a string representing the date operation.
  - Date operations are expressed in formats like '+1 day', '-3 months', '+ 48 hours', etc.
  - The `ezDatetime` object is updated to the result of the operation, and the modified object is returned.

- [x] **Feature 5: Calculate Date Difference**
  - Use the `getDifference(otherDatetime, unit = 'second')` method to calculate the difference between two `ezDatetime` objects.
  - The `otherDatetime` parameter should be another `ezDatetime` object for comparison.
  - The `unit` parameter is optional and represents the unit in which the difference will be returned. The default unit is 'second'.
  - Supported units include 'second', 'minute', 'hour', 'day', and more.
  - The method returns the difference as a floating-point number.

- [x] **Feature 6: String Representation**
  - Use the `toString()` method to return the Date as a string representation.
  - Use the `toISOString()` method to return the Date in ISO format as a string.
  - Use the `toUTCString()` method to return the Date in UTC format as a string.

- [x] **Feature 7: Date Parsing Data**
  - Use the `getYear()` method to return the year of the Date in "YYYY" format.
  - Use the `getMonth()` method to return the month of the Date in "mm" format. (return value between 1 and 12.)
  - Use the `getDate()` method to return the day of the Date in "dd" format.
  - Use the `getHours()` method to return the hours of the Date in "hh" format.
  - Use the `getMinutes()` method to return the minutes of the Date in "ii" format.
  - Use the `getSeconds()` method to return the seconds of the Date in "ss" format.
  - Use the `getMilliseconds()` method to return the milliseconds of the Date in "SSS" format.
