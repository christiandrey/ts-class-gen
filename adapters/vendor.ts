import {GlobalState} from '../..';
import {Normalized} from '../../../typings/state';
import {Vendor} from '../../../entities';
import {createEntityAdapter} from '@reduxjs/toolkit';

const vendorsAdapter = createEntityAdapter<Normalized<Vendor>>();

const selectors = vendorsAdapter.getSelectors<GlobalState>((state) => state.vendors);

export const {
    selectById: vendorByIdSelector,
    selectAll: allVendorsSelector,
    selectEntities: vendorEntitiesSelector,
} = selectors;

export default vendorsAdapter;