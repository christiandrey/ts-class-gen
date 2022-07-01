import {CommunityTopicEntities, communityTopicSchema} from './community-topic';

import {CommunityCategory} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const communityCategorySchema = new schema.Entity('communityCategories', {
    topics: [communityTopicSchema],
});

export type CommunityCategoryEntities = SchemaEntities<{
    communityCategory: CommunityCategory;
}> & CommunityTopicEntities;