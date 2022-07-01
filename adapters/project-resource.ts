import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {ProjectResource} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const projectResourcesAdapter = createEntityAdapter<Normalized<ProjectResource>>();

const selectors = projectResourcesAdapter.getSelectors<GlobalState>((state) => state.projectResources);

export const {
    selectById: projectResourceByIdSelector,
    selectAll: allProjectResourcesSelector,
    selectEntities: projectResourceEntitiesSelector,
} = selectors;

export default projectResourcesAdapter;