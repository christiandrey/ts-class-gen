import {CalendarEventType} from '../typings';
import {BaseEntity} from './base-entity';
import {UserLite} from './user-lite';

export class CalendarEvent extends BaseEntity {
    title: string;
    type: CalendarEventType;
    startAt: string;
    endAt: string;
    participants: Array<UserLite>;

    constructor(dto: CalendarEvent) {
        super(dto);

        this.title = dto.title;
        this.type = dto.type;
        this.startAt = dto.startAt;
        this.endAt = dto.endAt;
        this.participants = dto.participants?.map((o) => new UserLite(o)) ?? [];
    }
}