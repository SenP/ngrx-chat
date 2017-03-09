import { compose } from '@ngrx/core/compose';
import { storeData } from './storeData.reducer';
import { uiState } from './uiState.reducer';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

export function appReducer() {
    return compose(storeFreeze,combineReducers)({uiState, storeData});
}