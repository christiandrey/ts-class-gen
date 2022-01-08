import {PatientBiodata} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const patientBiodataSchema = new schema.Entity('patientBiodatas');

export type PatientBiodataEntities = SchemaEntities<{
    patientBiodata: PatientBiodata;
}>