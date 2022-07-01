import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ProjectMessage} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const projectMessagesAdapter = createEntityAdapter<Normalized<ProjectMessage>>();

const selectors = projectMessagesAdapter.getSelectors<GlobalState>((state) => state.projectMessages);

export const {
    selectById: projectMessageByIdSelector,
    selectAll: allProjectMessagesSelector,
    selectEntities: projectMessageEntitiesSelector,
} = selectors;

export default projectMessagesAdapter;