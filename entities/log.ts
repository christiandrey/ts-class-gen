import {LogLite} from './log-lite';

export class Log extends LogLite {
    logEvent: string;
    messageTemplate: string;
    exception: string;

    constructor(dto: Log) {
        super(dto);

        this.logEvent = dto.logEvent;
        this.messageTemplate = dto.messageTemplate;
        this.exception = dto.exception;
    }
}