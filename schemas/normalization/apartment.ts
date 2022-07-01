import {ApartmentTypeEntities, apartmentTypeSchema} from './apartment-type';
import {EstateEntities, estateSchema} from './estate';
import {OwnerEntities, ownerSchema} from './owner';
import {ResidentEntities, residentSchema} from './resident';

import {Apartment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const apartmentSchema = new schema.Entity('apartments', {
    owner: ownerSchema,
    type: apartmentTypeSchema,
    estate: estateSchema,
    currentResident: residentSchema,
    currentResident: residentSchema,
});

export type ApartmentEntities = SchemaEntities<{
    apartment: Apartment;
}> & OwnerEntities & ApartmentTypeEntities & EstateEntities & ResidentEntities & ResidentEntities;