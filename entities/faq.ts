import {FaqCategory} from './faq-category';

export class Faq {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    faqCategory: FaqCategory;

    constructor(dto: Faq) {
        this.id = dto.id;
        this.title = dto.title;
        this.description = dto.description;
        this.imageUrl = dto.imageUrl;
        this.faqCategory = new FaqCategory(dto.faqCategory);
    }
}