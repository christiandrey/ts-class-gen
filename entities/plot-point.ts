export class PlotPoint {
    label: number;
    value: number;

    constructor(dto: PlotPoint) {
        this.label = dto.label;
        this.value = dto.value;
    }
}