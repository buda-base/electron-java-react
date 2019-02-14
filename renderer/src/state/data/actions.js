// @flow
//import { createAction } from 'redux-actions';
import type { Action } from '../actions';

export const TYPES = {};

TYPES.helloWorldData = 'HELLO_WORLD_DATA';
export const helloWorldData = (str:string): Action => {
   return {
      type:TYPES.helloWorldData,
      payload:str
   }
}
