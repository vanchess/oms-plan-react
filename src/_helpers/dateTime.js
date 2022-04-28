import { DateTime as LuxonDateTime } from "luxon";

export class DateTime 
{
    #dateTime;

    constructor(dt) {
        this.#dateTime = dt;
    }

    static local() {
        const dt = LuxonDateTime.local(...arguments);
        return new DateTime(dt);
    }

    static fromISO() {
        const dt = LuxonDateTime.fromISO(...arguments);
        return new DateTime(dt);
    }

    static toMonthString() {
        const dt = LuxonDateTime.fromISO(...arguments);
        const f = {month: 'long'};
        return dt.toLocaleString(f);
    }

    toObject() {
        return this.#dateTime.toObject();
    }

}
/*
export const DateTimeBetween = (datetime, from, to) => {

}

export const getDateTimeBetweenFunction = (from, to) => {
    
    return 
}
*/