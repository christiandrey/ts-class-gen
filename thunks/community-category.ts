import {CommunityCategoryEntities, communityCategorySchema} from '../../../schemas/normalization/community-category';
import {createTypedAsyncThunk, safeNormalize} from '../../../utils/redux';

import {CommunityCategory} from '../../../entities/community-category';
import {api} from '../../../api';

export const fetchCommunityCategoriesByEstate = createTypedAsyncThunk(
    'communityCategories/fetchCommunityCategoriesByEstate',
    async (id: string) => {
        const response = await api.estates().readCommunityCategories(id);
        const responseData = response.data.data.map((o) => new CommunityCategory(o));
        const normalized = safeNormalize<CommunityCategory, CommunityCategoryEntities, Array<string>>(responseData, [communityCategorySchema]);
        return normalized;
    },
);