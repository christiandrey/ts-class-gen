import {InvoiceItem} from './invoice-item';
import {InvoiceLite} from './invoice-lite';

export class Invoice extends InvoiceLite {
    items: Array<InvoiceItem>;

    constructor(dto: Invoice) {
        super(dto);

        this.items = dto.items?.map((o) => new InvoiceItem(o)) ?? [];
    }
}