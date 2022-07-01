import {UserEntities, userSchema} from './user';

import {Review} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const reviewSchema = new schema.Entity('reviews', {
    user: userSchema,
});

export type ReviewEntities = SchemaEntities<{
    review: Review;
}> & UserEntities;