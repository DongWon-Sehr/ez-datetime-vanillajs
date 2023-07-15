class ezDatetime {
    constructor(targetDate = null, timezone = null) {
        if (targetDate && timezone) {
            this.setDate(targetDate, timezone);
          } else if (targetDate) {
            this.date = new Date(targetDate);
            this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          } else if (timezone) {
            this.#date = new Date(this.#date.toLocaleString('en-US', { timeZone: timezone }));
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
      const options = { timeZone: this.timezone, ...this.getFormatOptions(formatString) };
      return this.date.toLocaleString(navigator.language, options);
    }

    getFormatOptions(formatString) {
      const formatOptions = {};
      const supportedFormatDirectives = ['year', 'month', 'day', 'hour', 'minute', 'second'];
  
      supportedFormatDirectives.forEach((directive) => {
        if (formatString.includes(directive)) {
          formatOptions[directive] = formatString.indexOf(directive);
        }
      });
  
      return formatOptions;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ezDatetime;
} else {
    window.ezDatetime = ezDatetime;
}