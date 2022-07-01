import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Polyline} from '../../../entities/polyline';
import {api} from '../../../api';

export const fetchPolylineDirectionsForLocation = createTypedAsyncThunk(
    'polylines/fetchPolylineDirectionsForLocation',
    async (placeIds: Array<string>) => {
        const response = await api.locations().readPolylineDirections(placeIds);
        const responseData = new Polyline(response.data.data);
        return responseData;
    },
);