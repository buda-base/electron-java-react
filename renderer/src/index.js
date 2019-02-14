import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './lib/serviceWorker';
import * as Fun from './lib/Fun'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/reducers';
import {initiateApp} from './state/actions' ;
import createSagaMiddleware from 'redux-saga';
import rootSaga from './state/sagas'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as data from "./state/data/actions" ;


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const sagaMiddleware = createSagaMiddleware();
export let store = {} ;
if (process.env.NODE_ENV !== 'production') {
   store = createStore(
      rootReducer,
      composeWithDevTools(
         applyMiddleware(thunk,sagaMiddleware,logger)
      )
    );
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(thunk,sagaMiddleware)
    );
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer helloWorldProp="hello!!" />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


store.dispatch(initiateApp("hello, world"))

// interface with electron main app

let electron = window.electron
if(electron)
{
   const ipc = electron.ipcRenderer
   //const dialog = electron.remote.dialog // better use this one from main/index (bugs with centering otherwise)

   // listen for log events
   electron.ipcRenderer.on('log', function(event, message) {
      console.log(message);
   });

   // listen for menu events
   electron.ipcRenderer.on('MenuItem/Hello', function(event, message) {

      // dialogs work better from main window so we send back an message
      ipc.send('MenuItem/Hello',message);

      // why not call a function...
      Fun.fun1("renderer/index");

      // ...and trigger a redux event
      store.dispatch(data.helloWorldData("world is "+message))
   });


   // listen for manu/hello event
   electron.ipcRenderer.on('MenuItem1/Hello', function(event, message) {

      // dialogs work better from main window so we send back an message
      ipc.send('MenuItem1/Hello',message);

      // why not call a function...
      Fun.fun1("renderer/index");

   });

   // listen for "hello java" events
   electron.ipcRenderer.on('helloJava', function(event, message) {

      // trigger a redux event
      store.dispatch(data.helloWorldData(message))
   });
}
