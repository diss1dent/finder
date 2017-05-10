import { ActionReducer, Action } from '@ngrx/store';
import ACTIONTYPES from "../actions/types";

export const CommentsReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
        case ACTIONTYPES.commentsLoad:
            return Object.assign({}, state, {
                allComments: action.payload.allComments
            });
        case ACTIONTYPES.commentsAdd:
            return Object.assign({}, state, {
                commentsAdd: action.payload.commentsAdd
            });
        default:
            return state;
    }
};
