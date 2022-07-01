import {NotificationType} from '../typings';

export class Notification {
    id: string;
    createdAt: string;
    title: string;
    body: string;
    extraData: string;
    type: NotificationType;
    dataId?: string;
    dataParentId?: string;
    dataImageUrl: string;
    userId: string;

    constructor(dto: Notification) {
        this.id = dto.id;
        this.createdAt = dto.createdAt;
        this.title = dto.title;
        this.body = dto.body;
        this.extraData = dto.extraData;
        this.type = dto.type;
        this.dataId = dto.dataId;
        this.dataParentId = dto.dataParentId;
        this.dataImageUrl = dto.dataImageUrl;
        this.userId = dto.userId;
    }
}