import {MailAddress} from './mail-address';

export class Mailing {
    content: string;
    subject: string;
    addresses: Array<MailAddress>;
    template: string;

    constructor(dto: Mailing) {
        this.content = dto.content;
        this.subject = dto.subject;
        this.addresses = dto.addresses?.map((o) => new MailAddress(o)) ?? [];
        this.template = dto.template;
    }
}