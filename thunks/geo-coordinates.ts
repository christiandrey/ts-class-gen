import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {GeoCoordinates} from '../../../entities/geo-coordinates';
import {api} from '../../../api';

export const fetchDirectionsForLocation = createTypedAsyncThunk(
    'geoCoordinates/fetchDirectionsForLocation',
    async (placeIds: Array<string>) => {
        const response = await api.locations().readDirections(placeIds);
        const responseData = new GeoCoordinates(response.data.data);
        return responseData;
    },
);