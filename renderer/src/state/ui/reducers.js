// @flow
import type { Action } from '../actions';
import { createReducer } from '../actions';
import * as actions from './actions';

export type UIState = {
   helloUI?:string
}

const DEFAULT_STATE: UIState = {}

let reducers = {};

export const helloWorldUI = (state: UIState, action: Action) => {
   let helloUI = state.helloUI
   if(!helloUI) helloUI = ""
   helloUI += " " + action.payload
    return { ...state, helloUI }
}
reducers[actions.TYPES.helloWorldUI] = helloWorldUI;

// UI Reducer
const reducer = createReducer(DEFAULT_STATE, reducers);
export default reducer;
