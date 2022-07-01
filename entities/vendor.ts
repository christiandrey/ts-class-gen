import {EstateLite} from './estate-lite';
import {VendorLite} from './vendor-lite';

export class Vendor extends VendorLite {
    estates: Array<EstateLite>;

    constructor(dto: Vendor) {
        super(dto);

        this.estates = dto.estates?.map((o) => new EstateLite(o)) ?? [];
    }
}