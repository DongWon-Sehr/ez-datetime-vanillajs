import { timezones } from './static/timezones.js';
class ezDatetime {
    /**
     * @param {String|null} targetDate - Target date to create (default: null)
     * @param {String|null} timezone - IANA Time Zone Identifier (default: null)
     */
    constructor(targetDate = null, timezone = null) {
        this.timezones = timezones;

        if (targetDate && !this._isValidDate(targetDate)) {
            throw new Error('Invalid targetDate. Please provide a valid date string.');
        }
        if (timezone && !this._isValidTimezone(timezone)) {
            throw new Error('Invalid timezone. Please provide a valid IANA Time Zone Identifier.');
        }

        if (targetDate && timezone) {
            this._setDate(targetDate, timezone);
        } else if (targetDate) {
            this.date = new Date(targetDate);
            this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } else if (timezone) {
            const dateString = new Date().toLocaleString('en-US', { timeZone: timezone });
            this.date = new Date(dateString);
            this.timezone = timezone;
        } else {
            this.date = new Date();
            this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
    }

    /**
     * Change timezone.
     * @param {String} timezone - IANA Time Zone Identifier
     * @returns {ezDatetime}
     */
    setTimezone(timezone) {
        this.date = new Date(this.date.toLocaleString('en-US', { timeZone: timezone }));
        this.timezone = timezone;
        return this;
    }

    /**
     * Get String type date with the given format.
     * @param {String} formatString - Format string to get. (ex. 'yyyy-mm-dd HH:mm:ss.SSS')
     * - Year: 'yyyy' or 'yy'
     * - Month: 'MM'
     * - Date: 'dd'
     * - Hours: 'HH'
     * - Minutes: 'mm'
     * - Seconds: 'ss'
     * - Milliseconds: 'SSS'
     * @returns {String}
     */
    format(formatString) {
        let formattedString = formatString;

        if (formatString.includes('yyyy')) {
            formattedString = formattedString.replace(/yyyy/g, this.date.getFullYear());
        } else if (formatString.includes('yy')) {
            formattedString = formattedString.replace(/yy/g, this.date.getFullYear().toString().slice(-2));
        } else {
            formattedString = formattedString.replace(/y{2,4}/g, '');
        }

        formattedString = formattedString
            .replace(/MM/g, (this.date.getMonth() + 1).toString().padStart(2, '0'))
            .replace(/dd/g, this.date.getDate().toString().padStart(2, '0'))
            .replace(/HH/g, this.date.getHours().toString().padStart(2, '0'))
            .replace(/mm/g, this.date.getMinutes().toString().padStart(2, '0'))
            .replace(/ss/g, this.date.getSeconds().toString().padStart(2, '0'))
            .replace(/SSS/g, this.date.getMilliseconds().toString().padStart(3, '0'));

        return formattedString;
    }

    /**
     * Add or subtract dates.
     * @param {String} operation - Expression to add or subtract (ex. '+2 days')
     * @returns {ezDatetime}
     */
    calculate(operation) {
        const match = operation.match(/([+-]?\s?\d+)\s?(\w+)/);
        if (!match) {
            throw new Error('Invalid operation format. Please use format like "+1 day" or "-3 months".');
        }
        const [, value, unit] = match;
        const unitValue = this._getUnitValue(unit);
        if (isNaN(unitValue)) {
            throw new Error(`Invalid unit "${unit}".`);
        }
        const timeInMilliseconds = parseInt(value) * unitValue;
        this._setDate(this.date.getTime() + timeInMilliseconds, this.timezone);
        return this;
    }

    /**
     * Get the difference with the given ezDatetime.
     * @param {ezDatetime} otherDatetime - Another ezDatetime object to compare with
     * @param {String} unit - Unit of difference: year, month, week, day, hour, minute, second, millisecond (default: 'second')
     * @returns {number}
     */
    getDifference(otherDatetime, unit = 'second') {
        const unitValue = this._getUnitValue(unit);
        if (isNaN(unitValue)) {
            throw new Error(`Invalid unit "${unit}".`);
        }
        const diffInMilliseconds = Math.abs(this.date - otherDatetime.date);
        return diffInMilliseconds / unitValue;
    }

    /**
     * Get the year part of a date, using local time.
     * @returns {number}
     */
    getYear() {
        return this.date.getFullYear();
    }

    /**
     * Get the month part of a date, using local time.
     * @returns {number} (1~12)
     */
    getMonth() {
        return this.date.getMonth() + 1;
    }

    /**
     * Get the date part of a date, using local time.
     * @returns {number}
     */
    getDate() {
        return this.date.getDate();
    }

    /**
     * Get the hours part of a date, using local time.
     * @returns {number}
     */
    getHours() {
        return this.date.getHours();
    }

    /**
     * Get the minutes part of a date, using local time.
     * @returns {number}
     */
    getMinutes() {
        return this.date.getMinutes();
    }

    /**
     * Get the seconds part of a date, using local time.
     * @returns {number}
     */
    getSeconds() {
        return this.date.getSeconds();
    }

    /**
     * Get the milliseconds part of a date, using local time.
     * @returns {number}
     */
    getMilliseconds() {
        return this.date.getMilliseconds();
    }

    /**
     * Returns a string representation of a date.
     * @returns {String}
     */
    toString() {
        return this.date.toString();
    }

    /**
     * Returns a date as a string value in ISO format.
     * @returns {String}
     */
    toISOString() {
        return this.date.toISOString();
    }

    /**
     * Returns a date converted to a string using Universal Coordinated Time (UTC).
     * @returns {String}
     */
    toUTCString() {
        return this.date.toUTCString();
    }

    /**
     * Set date with given targetDate and timezone
     * @param {String|number} targetDate - Target date to create
     * @param {String} timezone - IANA Time Zone Identifier
     */
    _setDate(targetDate, timezone) {
        let tmpDate;
        if (typeof targetDate === 'number' ) {
            tmpDate = new Date(targetDate);
        } else {
            const [datePart, timePart] = targetDate.split(' ');
    
            let [year, month, day] = [0, 0, 0];
            if (datePart) {
                [year, month, day] = datePart.split(/-|:|\//).map(Number);
            }
    
            let [hour, minute, second] = [0, 0, 0];
            if (timePart) {
                [hour, minute, second] = timePart.split(':').map(Number);
            }
    
            year = parseInt(year);
            month = parseInt(month);
            day = parseInt(day);
            hour = parseInt(hour);
            minute = parseInt(minute);
            second = parseInt(second);
            
            const offsetInMinute = this._getUTCOffset(timezone);
            minute += offsetInMinute;

            tmpDate = new Date(Date.UTC(year, month, day, hour, minute, second));
        }

        this.date = new Date(tmpDate);
        this.timezone = timezone;
    }

    /**
     * Get unit value in milliseconds.
     * @param {String} unit - Unit of time: year, month, week, day, hour, minute, second, millisecond
     * @returns {number}
     */
    _getUnitValue(unit) {
        const unitMap = {
            millisecond: 1,
            second: 1000,
            minute: 60 * 1000,
            hour: 60 * 60 * 1000,
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            month: 30 * 24 * 60 * 60 * 1000,
            year: 365 * 24 * 60 * 60 * 1000,
        };

        const unitKey = unit.toLowerCase().replace(/s$/, '');
        return unitMap[unitKey] || NaN;
    }

    /**
     * Check if the input is a valid date string.
     * @param {String} date - Input date string
     * @returns {boolean}
     */
    _isValidDate(date) {
        const timestamp = Date.parse(date);
        return !isNaN(timestamp);
    }

    /**
     * Check if the input is a valid IANA timezone.
     * @param {String} timezone - Input timezone string
     * @returns {boolean}
     */
    _isValidTimezone(timezone) {
        return Object.keys(this.timezones).map(key => key.toLowerCase()).includes(timezone.toLowerCase());
    }

    /**
     * Get offset time in minutes compare to UTC timezone
     * @param {String} timezone - Input timezone string
     * @returns {number}
     */
    _getUTCOffset(timezone) {
        if (!this._isValidTimezone(timezone)) {
            throw new Error('Invalid timezone. Please provide a valid IANA Time Zone Identifier.');
        }

        const offsetString = this.timezones.timezone;
        const [hourPart, minute] =  offsetString.split(':');
        const sign = hourPart.substring(0, 1);
        const hour = hourPart.substring(1);

        let offsetInMinute = parseInt(hour) * 60 + parseInt(minute);
        if (sign == "-") offsetInMinute = offsetInMinute * (-1);

        return offsetInMinute;
    }
}

export default ezDatetime;