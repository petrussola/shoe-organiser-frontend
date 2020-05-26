// DEPENDENCIES
import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// GLOBAL STYLE
import { GlobalStyle } from './Styles/Globalstyle';

// COMPONENTS
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Auth/Login/Login';
import Signup from './Components/Auth/Signup/Signup';
import Shoes from './Components/Shoes/Shoes';

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			<Navbar />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={Signup} />
			<Route path='/shoes' component={Shoes} />
		</div>
	);
}

export default App;
