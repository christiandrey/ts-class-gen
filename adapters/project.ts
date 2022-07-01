import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Project} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const projectsAdapter = createEntityAdapter<Normalized<Project>>();

const selectors = projectsAdapter.getSelectors<GlobalState>((state) => state.projects);

export const {
    selectById: projectByIdSelector,
    selectAll: allProjectsSelector,
    selectEntities: projectEntitiesSelector,
} = selectors;

export default projectsAdapter;