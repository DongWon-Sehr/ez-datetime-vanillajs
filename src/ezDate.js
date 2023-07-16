import { timezones } from './static/timezones.js';

class ezDate extends Date {
    constructor(...args) {
        let timezone;
        if (args.length > 1 && typeof args[args.length - 1] === 'string') {
            timezone = args.pop();
        } else {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }

        super(...args);

        this.timezone = timezone;
    }

    toString() {
        const year = this.getFullYear().toString();
        const month = (this.getMonth() + 1).toString().padStart(2, '0');
        const day = this.getDate().toString().padStart(2, '0');
        const hours = this.getHours().toString().padStart(2, '0');
        const minutes = this.getMinutes().toString().padStart(2, '0');
        const seconds = this.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC${timezones[this.timezone]} (${this.timezone})`;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'default' || hint === 'string') {
            return this.toString();
        }
        return super[Symbol.toPrimitive](hint);
    }

    get [Symbol.toStringTag]() {
        const year = this.getFullYear().toString();
        const month = (this.getMonth() + 1).toString().padStart(2, '0');
        const day = this.getDate().toString().padStart(2, '0');
        const hours = this.getHours().toString().padStart(2, '0');
        const minutes = this.getMinutes().toString().padStart(2, '0');
        const seconds = this.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC${timezones[this.timezone]} (${this.timezone})`;
    }
}

export { ezDate };