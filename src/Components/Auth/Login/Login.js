/* eslint-disable jsx-a11y/label-has-associated-control */
// dependencies
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// components
import AuthMessage from '../Helpers/AuthMessage';

const initialUser = {
	email: '',
	password: '',
};

const Login = ({ setIsLoggedIn, history }) => {
	const [userLogin, setUserLogin] = useState(initialUser); // state for user being filled in the form
	const [isLoading, setIsLoading] = useState(false); // displays loading message while waiting for Promise to resolve
	const [authError, setauthError] = useState(null); // in case sign up error. Store a string that gets displayed in case of error

	// form state as user types credentials
	const onLoginFormChange = e => {
		setUserLogin({
			...userLogin,
			[e.target.id]: e.target.value,
		});
	};

	// submit login form logic
	const onSubmitLoginForm = async e => {
		e.preventDefault();
		setIsLoading(true); // sets loading spinner
		setauthError(null); // clears any message from preious attempts
		try {
			// api login call
			const data = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/auth/login`,
				userLogin
			);
			setUserLogin(initialUser); // clears the form
			setIsLoggedIn(true);
			localStorage.setItem('token', data.data.token); // saves token to loca storage
			history.push('/shoes'); // redirect to shoes page
		} catch (error) {
			setauthError(error.response.data.message); // sets login error
		} finally {
			setIsLoading(false); // removes the spinner
		}
	};

	return (
		<section>
			<AuthMessage isLoading={isLoading} authError={authError} />
			<form onSubmit={onSubmitLoginForm}>
				<label>
					Email
					<input
						type='text'
						name='email'
						id='email'
						value={userLogin.email}
						onChange={onLoginFormChange}
					/>
				</label>
				<label>
					Password
					<input
						type='password'
						name='password'
						id='password'
						value={userLogin.password}
						onChange={onLoginFormChange}
					/>
				</label>
				<button type='submit'>Login</button>
			</form>
		</section>
	);
};

Login.propTypes = {
	history: PropTypes.objectOf(PropTypes.object),
	setIsLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
