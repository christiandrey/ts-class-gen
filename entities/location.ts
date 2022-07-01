export class Location {
    id: string;
    placeId: string;
    latitude: number;
    longitude: number;
    bearing: number;
    state: string;
    country: string;
    description: string;
    floorNo: string;
    zipcode: string;
    isNigeria: boolean;

    constructor(dto: Location) {
        this.id = dto.id;
        this.placeId = dto.placeId;
        this.latitude = dto.latitude;
        this.longitude = dto.longitude;
        this.bearing = dto.bearing;
        this.state = dto.state;
        this.country = dto.country;
        this.description = dto.description;
        this.floorNo = dto.floorNo;
        this.zipcode = dto.zipcode;
        this.isNigeria = dto.isNigeria;
    }
}