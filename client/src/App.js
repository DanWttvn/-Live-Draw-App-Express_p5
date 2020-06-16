import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import './scss/main.scss';
// import Alert from "./components/elements/Alert"
import Canvas from './components/layout/Canvas'


// if(localStorage.token) {
// 	setAuthToken(localStorage.token)
// }

class App extends Component {

	// componentDidMount() {
	// 	store.dispatch(loadUser());
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Fragment>
						{/* <Alert /> */}
						<Switch>
							<Route exact path="/" component={Canvas} />
							
						</Switch>
					</Fragment>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
