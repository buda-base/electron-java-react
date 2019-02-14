//@flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import App from '../components/App'
import * as ui from "../state/ui/actions" ;


const mapStateToProps = (state: Object, ownProps: Object): Object => {
   let props = { ...ownProps }

   let helloUI = state.ui.helloUI
   let helloData = state.data.helloData

   props = { ...props, helloWorldUI:helloUI, helloWorldData:helloData}

   // useful to check state when something's wrong in app.render 
   //console.log("mS2P",props)

   return props ;
}

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => {
   return {
      onButtonClick:(str:string) => {
         dispatch(ui.helloWorldUI(str))
      }
   }
};

const AppContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(App);

export default AppContainer;
