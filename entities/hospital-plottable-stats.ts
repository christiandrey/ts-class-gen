import {TimeDuration} from '../typings';
import {PlotPoint} from './plot-point';

export class HospitalPlottableStats {
    timeDuration: TimeDuration;
    startDate: string;
    previousValues: Array<PlotPoint>;
    currentValues: Array<PlotPoint>;

    constructor(dto: HospitalPlottableStats) {
        this.timeDuration = dto.timeDuration;
        this.startDate = dto.startDate;
        this.previousValues = dto.previousValues?.map((o) => new PlotPoint(o)) ?? [];
        this.currentValues = dto.currentValues?.map((o) => new PlotPoint(o)) ?? [];
    }
}