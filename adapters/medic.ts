import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Medic} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const medicsAdapter = createEntityAdapter<Normalized<Medic>>();

const selectors = medicsAdapter.getSelectors<GlobalState>((state) => state.medics);

export const {
    selectById: medicByIdSelector,
    selectAll: allMedicsSelector,
    selectEntities: medicEntitiesSelector,
} = selectors;

export default medicsAdapter;