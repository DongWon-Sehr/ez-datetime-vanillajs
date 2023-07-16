class ezDatetime {

    constructor(targetDate = null, timezone = null) {
        if (targetDate && timezone) {
            this.setDate(targetDate, timezone);
        } else if (targetDate) {
            this.date = new Date(targetDate);
            this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } else if (timezone) {
            this.date = new Date(this.date.toLocaleString('en-US', { timeZone: timezone }));
            this.timezone = timezone;
        } else {
            this.date = new Date();
            this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
    }

    setTimezone(timezone) {
        this.date = new Date(this.date.toLocaleString('en-US', { timeZone: timezone }));
        this.timezone = timezone;
    }

    format(formatString) {
        const options = { timeZone: this.timezone, ...this._getFormatOptions(formatString) };
        return this.date.toLocaleString(navigator.language, options);
    }

    calculate(operation) {
        const match = operation.match(/([+-]?\d+) (\w+)/);
        if (!match) {
            throw new Error('Invalid operation format. Please use format like "+1 day" or "-3 months".');
        }
        const [, value, unit] = match;
        const unitValue = this._getUnitValue(unit);
        if (isNaN(unitValue)) {
            throw new Error(`Invalid unit "${unit}".`);
        }
        const timeInMilliseconds = parseInt(value) * unitValue;
        const newDate = new Date(this.date.getTime() + timeInMilliseconds);
        this.date = new Date(newDate.toLocaleString('en-US', { timeZone: this.timezone }));
        return this;
    }

    getDifference(otherDatetime, unit = 'second') {
        const unitValue = this._getUnitValue(unit);
        if (isNaN(unitValue)) {
            throw new Error(`Invalid unit "${unit}".`);
        }
        const diffInMilliseconds = Math.abs(this.date - otherDatetime.date);
        return diffInMilliseconds / unitValue;
    }

    getYear() {
        return this.date.getFullYear();
    }

    getMonth() {
        return this.date.getMonth() + 1;
    }

    getDate() {
        return this.date.getDate();
    }

    getHours() {
        return this.date.getHours();
    }

    getMinutes() {
        return this.date.getMinutes();
    }

    getSeconds() {
        return this.date.getSeconds();
    }

    getMilliseconds() {
        return this.date.getMilliseconds();
    }

    toString() {
        return this.date.toString();
    }

    toISOString() {
        return this.date.toISOString();
    }

    toUTCString() {
        return this.date.toUTCString();
    }

    _getFormatOptions(formatString) {
        const formatOptions = {};
        const supportedFormatDirectives = ['year', 'month', 'day', 'hour', 'minute', 'second'];

        supportedFormatDirectives.forEach((directive) => {
            if (formatString.includes(directive)) {
                formatOptions[directive] = formatString.indexOf(directive);
            }
        });

        return formatOptions;
    }

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

        return unitMap[unit.toLowerCase()] || NaN;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ezDatetime;
} else {
    window.ezDatetime = ezDatetime;
}