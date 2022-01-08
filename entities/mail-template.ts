import {EmailTemplateType} from '../typings';

export class MailTemplate {
    content: string;
    emailTemplate: EmailTemplateType;

    constructor(dto: MailTemplate) {
        this.content = dto.content;
        this.emailTemplate = dto.emailTemplate;
    }
}