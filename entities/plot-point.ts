export class PlotPoint {
    label: string;
    value: number;

    constructor(dto: PlotPoint) {
        this.label = dto.label;
        this.value = dto.value;
    }
}