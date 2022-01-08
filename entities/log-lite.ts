import {LogLevel} from '../typings';

export class LogLite {
    id: string;
    message: string;
    level: LogLevel;
    timestamp: string;

    constructor(dto: LogLite) {
        this.id = dto.id;
        this.message = dto.message;
        this.level = dto.level;
        this.timestamp = dto.timestamp;
    }
}