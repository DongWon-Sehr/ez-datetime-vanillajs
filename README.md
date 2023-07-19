# @smarttuna/ez-datetime-vanillajs
Easy peasy datetime module (Vanilla JS)

![Downloads](https://img.shields.io/npm/dw/@smarttuna/ez-datetime-vanillajs.svg)
![Downloads](https://img.shields.io/npm/dm/@smarttuna/ez-datetime-vanillajs.svg)
![Downloads](https://img.shields.io/npm/dt/@smarttuna/ez-datetime-vanillajs.svg)
[![GitHub bug issues](https://img.shields.io/github/issues/DongWon-Sehr/ez-datetime-vanillajs/bug?label=bug%20reports)](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
<br>
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E.svg?logo=javascript&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/-Vanilla_JS-4EBA32.svg)
![npm version](https://img.shields.io/npm/v/@smarttuna/ez-datetime-vanillajs.svg)
![License](https://img.shields.io/npm/l/@smarttuna/ez-datetime-vanillajs.svg)

`@smarttuna/ez-datetime-vanillajs` is a lightweight JavaScript library for working with dates and timezones. It provides an easy-to-use interface for creating, manipulating, and formatting dates. It supports various date formats and allows you to perform calculations and get the difference between dates.

> - Github: [https://github.com/DongWon-Sehr/ez-datetime-vanillajs](https://github.com/DongWon-Sehr/ez-datetime-vanillajs)
> - NPM: [https://www.npmjs.com/package/@smarttuna/ez-datetime-vanillajs](https://www.npmjs.com/package/@smarttuna/ez-datetime-vanillajs)

## Installation

You can install `@smarttuna/ez-datetime-vanillajs` using npm or by including the library directly in your HTML file.

### npm

```shell
npm install @smarttuna/ez-datetime-vanillajs
```

### HTML

Add the following script tag to your HTML file:

```html
<script src="https://unpkg.com/@smarttuna/ez-datetime-vanillajs@latest/dist/main.js"></script>
```

## Usage
To use `@smarttuna/ez-datetime-vanillajs`, you need to create an instance of the ezDatetime class. You can optionally provide a target date and timezone when creating the instance. If no target date or timezone is provided, the current date and the local timezone will be used.


Here's an example of creating an ezDatetime object:
```javascript
// You don't need this import statement if you load the package using an HTML script tag
import ezDatetime from '@smarttuna/ez-datetime-vanillajs';

const targetDate = '2023-07-16 15:30:00';
const timezone = 'America/New_York';

const datetime = new ezDatetime(targetDate, timezone);
```
`timezone` parameter should be a string of the [IANA Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) format, and the list of identifiers and UTC offset data is embedded within the ezDatetime class. You can access the object using [`ezDatetime.timezones`](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/blob/main/src/static/timezones.js).

### Object Creation Examples
1. Create an ezDatetime object with the current date and local timezone:
```javascript
const datetime = new ezDatetime();
```

2. Create an ezDatetime object with a specific target date and local timezone:
```javascript
const targetDate = '2023-07-16 15:30:00';
const datetime = new ezDatetime(targetDate);
```

3. Create an ezDatetime object with the current date and a specific timezone:
```javascript
const timezone = 'America/New_York';
const datetime = new ezDatetime(null, timezone);
```

4. Create an ezDatetime object with a specific target date and timezone:
```javascript
const targetDate = '2023-07-16 15:30:00';
const timezone = 'America/New_York';
const datetime = new ezDatetime(targetDate, timezone);
```

### Other method
```javascript
const datetime = new ezDatetime();

// Change the timezone
datetime.setTimezone('America/New_York');

// Get the formatted date
const formattedDate = datetime.format('yyyy-mm-dd HH:mm:ss.SSS');

// Add or subtract dates
datetime.calculate('+2 days');
datetime.calculate('-3 months');
datetime.calculate('+48 hours');

// Get the difference between two dates
const otherDatetime = new ezDatetime();
const differenceInSecond = datetime.getDifference(otherDatetime);
const differenceInHour = datetime.getDifference(otherDatetime, 'hour');
const differenceInWeek = datetime.getDifference(otherDatetime, 'week');

// Get the year
const year = datetime.getYear();

// Get the month (Response is in the range of 1 ~ 12)
const month = datetime.getMonth();

// Get the date
const date = datetime.getDate();

// Get the hours
const hours = datetime.getHours();

// Get the minutes
const minutes = datetime.getMinutes();

// Get the seconds
const seconds = datetime.getSeconds();

// Get the milliseconds
const milliseconds = datetime.getMilliseconds();

// Convert to string
const stringRepresentation = datetime.toString();

// Convert to ISO string
const isoString = datetime.toISOString();

// Convert to UTC string
const utcString = datetime.toUTCString();
```

## Support

- 👉 [Submit a bug report](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
- 👉 [Submit a feature request](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)
- 👉 [Submit any feedback](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/issues/new/choose)

## Release Notes
See [CHANGELOG.md](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/blob/main/CHANGELOG.md)

## License
See [LICENSE.md](https://github.com/DongWon-Sehr/ez-datetime-vanillajs/blob/main/LICENSE.md)