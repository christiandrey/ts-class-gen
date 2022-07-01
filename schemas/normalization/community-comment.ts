import {UserEntities, userSchema} from './user';

import {CommunityComment} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const communityCommentSchema = new schema.Entity('communityComments', {
    user: userSchema,
});

export type CommunityCommentEntities = SchemaEntities<{
    communityComment: CommunityComment;
}> & UserEntities;