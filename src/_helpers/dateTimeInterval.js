import { Interval as LuxonInterval} from 'luxon'; 
import { DateTime as LuxonDateTime } from "luxon";

export class Interval {
    #interval;

    constructor(interval) {
        this.#interval = interval;
    }

    static fromDateTimes(start, end) {
        const i = LuxonInterval.fromDateTimes(start.toObject(), end.toObject())
        return new Interval(i);
    }

    contains(dateTime) {
        const dt = LuxonDateTime.fromObject(dateTime.toObject());
        return this.#interval.contains(dt)
    }
}