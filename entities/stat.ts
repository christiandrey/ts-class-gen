import {PlotPoint} from './plot-point';

export class Stat {
    startDate: string;
    endDate: string;
    points: Array<PlotPoint>;

    constructor(dto: Stat) {
        this.startDate = dto.startDate;
        this.endDate = dto.endDate;
        this.points = dto.points?.map((o) => new PlotPoint(o)) ?? [];
    }
}