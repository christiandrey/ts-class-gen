import {UserEntities, userSchema} from './user';

import {CommunityTopic} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const communityTopicSchema = new schema.Entity('communityTopics', {
    user: userSchema,
});

export type CommunityTopicEntities = SchemaEntities<{
    communityTopic: CommunityTopic;
}> & UserEntities;