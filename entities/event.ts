export class Event {
    title: string;
    body: string;

    constructor(dto: Event) {
        this.title = dto.title;
        this.body = dto.body;
    }
}