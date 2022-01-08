import {EncounterEntities, encounterSchema} from '../../../schemas/normalization/encounter';
import {EncounterCreationOptions, EncounterUpdateOptions} from '../../../typings/dtos';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {Encounter} from '../../../entities/encounter';
import {EncounterLite} from '../../../entities/encounter-lite';
import {api} from '../../../api';

export const createEncounterForClinicalVisit = createTypedAsyncThunk(
    'encounters/createEncounterForClinicalVisit',
    async (params: {id: string; options: EncounterCreationOptions}) => {
        const {id, options} = params;
        const response = await api.clinicalVisits().createEncounter(id, options);
        const responseData = new Encounter(response.data.data);
        const normalized = safeNormalize<Encounter, EncounterEntities, string>(responseData, encounterSchema);
        return normalized;
    },
);

export const fetchEncountersByClinicalVisit = createTypedAsyncThunk(
    'encounters/fetchEncountersByClinicalVisit',
    async (id: string) => {
        const response = await api.clinicalVisits().readEncounters(id);
        const responseData = response.data.data.map((o) => new EncounterLite(o));
        const normalized = safeNormalize<Encounter, EncounterEntities, Array<string>>(responseData, [encounterSchema]);
        return normalized;
    },
);

export const fetchEncounterById = createTypedAsyncThunk(
    'encounters/fetchEncounterById',
    async (id: string) => {
        const response = await api.encounters().readById(id);
        const responseData = new Encounter(response.data.data);
        const normalized = safeNormalize<Encounter, EncounterEntities, string>(responseData, encounterSchema);
        return normalized;
    },
);

export const updateEncounter = createTypedAsyncThunk(
    'encounters/updateEncounter',
    async (params: {id: string; options: EncounterUpdateOptions}) => {
        const {id, options} = params;
        const response = await api.encounters().update(id, options);
        const responseData = new Encounter(response.data.data);
        const normalized = safeNormalize<Encounter, EncounterEntities, string>(responseData, encounterSchema);
        return normalized;
    },
);