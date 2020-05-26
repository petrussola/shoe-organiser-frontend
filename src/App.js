/* eslint-disable react/jsx-curly-newline */
// DEPENDENCIES
import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
			<PrivateRoute path='/shoes' component={Shoes} />
		</div>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('token') ? (
				<Component {...props} />
			) : (
				<Redirect to='/login' />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	component: PropTypes.objectOf(PropTypes.object),
};

export default App;
