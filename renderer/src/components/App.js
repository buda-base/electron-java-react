//@flow
import React, { Component } from 'react';
import './App.css';
import * as Fun from '../lib/Fun'

type Props = {
   helloWorldProp:string,
   helloWorldUI?:string,
   helloWorldData?:string,
   onButtonClick:(string)=>void
}

class App extends Component<Props> {

   render() {

      let flowTest = Fun.fun2(0)
      //console.log(flowTest) // uncomment to fix flow warning

      // can be useful for debugging purposes
      //console.log("render",this.props)

      return (
         <div className="App">
            <header className="App-header">
               <img src="BDRC.svg" className="App-logo" alt="logo" />
               <p>
                  Edit <code>renderer/src/App.js</code> and save to reload.
               </p>
               <p>
                  <button onClick={(e) => this.props.onButtonClick("test")}>Click</button>
               </p>
               <p>
                  <span>{this.props.helloWorldProp}</span>
                  <span>{this.props.helloWorldUI}</span>
                  <span>{this.props.helloWorldData}</span>
               </p>
            </header>
         </div>
      );
   }
}

export default App;
