import { SELECT_USER_ACTION, THREAD_SELECTED_ACTION } from '../actions';
import { Action } from '@ngrx/store';
import { INITIAL_UI_STATE, UiState } from '../ui-state';

export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {

    const newState = Object.assign({}, state);

    switch (action.type) {    
        case THREAD_SELECTED_ACTION:     
            newState.currentThreadId = action.payload.selectedThreadId;
            return newState;            
        
        case SELECT_USER_ACTION: 
            newState.userId = action.payload;
            newState.currentThreadId = undefined;
            return newState;            
        
        default:
            return state;
    }
}