import React from 'react';
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import { Provider } from "react-redux";


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);



reportWebVitals();
