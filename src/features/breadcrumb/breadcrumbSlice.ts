import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Breadcrumb } from '../../common/types';

interface BreadcrumbState {
    items: Array<Breadcrumb>;
}

const initialState: BreadcrumbState = {
    items: []
};

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setBreadcrumb: (state, action: PayloadAction<Breadcrumb[]>) => {
            state.items = action.payload;
        },
    },

});

export const { setBreadcrumb } = breadcrumbSlice.actions;

export const selectBreadcrumb = (state: RootState) => state.breadcrumb.items
export default breadcrumbSlice.reducer;