// @flow
import { takeLatest, all } from 'redux-saga/effects';
import { INITIATE_APP } from '../actions';

function initiateApp(str:string) {
   try {
      console.log("app initiated:",str)
   }
   catch(e) {
      console.error('initiateApp error: %o', e);
   }
}

// --------------------------------------------------------

export function* watchInitiateApp() {
   yield takeLatest(
      INITIATE_APP,
      (action) => initiateApp(action.payload)
   );
}

// --------------------------------------------------------


export default function* rootSaga() {
   yield all([
      watchInitiateApp()
   ])
}
