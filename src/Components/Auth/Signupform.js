/* eslint-disable jsx-a11y/label-has-associated-control */
// dependencies
import React, { useState } from 'react';
import axios from 'axios';

// helper
import { schema } from '../../Helpers/Formvalidation';

// components
import SignupMessage from './SignupMessage';
import ValidationMessage from './ValidationMessage';

const initialSignupUser = {
	email: '',
	password: '',
	name: '',
	last_name: '',
};

const Signupform = () => {
	const [signUpUser, setSignUpUser] = useState(initialSignupUser); // state of form content
	const [isLoading, setIsLoading] = useState(false); // displays loading message while waiting for Promise to resolve
	const [isSignup, setIsSignup] = useState(false); // succesful signup
	const [signupError, setSignupError] = useState(null); // in case sign up error. Store a string that gets displayed in case of error
	const [validationError, setValidationError] = useState([]); // stores array of validation error messages, if any

	const onSignupFormChange = e => {
		setSignUpUser({
			...signUpUser,
			[e.target.id]: e.target.value,
		});
	};

	const onSignupSubmitForm = async e => {
		e.preventDefault();
		setValidationError([]); // clear validation errors, if any
		setSignupError(null); // clear error messages
		try {
			const validatedUser = await schema.validate(signUpUser, {
				abortEarly: false,
			}); // yup validation
			setIsLoading(true); // activates loading spinner
			await axios.post(
				`${process.env.REACT_APP_BASE_URL}api/auth/register`,
				validatedUser
			);
			setIsSignup(true); // sets sign up as success
		} catch (error) {
			if (error.message === 'Network Error') {
				setSignupError('There was a network error. Try again later.'); // if server is down
			} else if (error.name === 'ValidationError') {
				setValidationError(error.errors); // if fields are not validated
			} else {
				setSignupError(error.response.data.message); // sets error message
			}
		} finally {
			setSignUpUser(initialSignupUser); // resets form
			setIsLoading(false); // hides loading spinner
		}
	};

	const isDisabled = () => {
		if (
			!signUpUser.email ||
			!signUpUser.password ||
			!signUpUser.name ||
			!signUpUser.last_name
		) {
			return true;
		}
		return false;
	};
	return (
		<div>
			<SignupMessage
				isSignup={isSignup}
				signupError={signupError}
				isLoading={isLoading}
			/>
			{validationError.length === 0
				? null
				: validationError.map(item => {
						return <ValidationMessage item={item} />;
				  })}
			<form onSubmit={onSignupSubmitForm}>
				<label>
					Email
					<input
						type='text'
						name='email'
						id='email'
						value={signUpUser.email}
						onChange={onSignupFormChange}
					/>
				</label>
				<label>
					Password
					<input
						type='text'
						name='password'
						id='password'
						value={signUpUser.password}
						onChange={onSignupFormChange}
					/>
				</label>
				<label>
					First Name
					<input
						type='text'
						name='name'
						id='name'
						value={signUpUser.name}
						onChange={onSignupFormChange}
					/>
				</label>
				<label>
					Last Name
					<input
						type='text'
						name='last_name'
						id='last_name'
						value={signUpUser.last_name}
						onChange={onSignupFormChange}
					/>
				</label>
				<button type='submit' disabled={isDisabled()}>
					Sign up
				</button>
			</form>
		</div>
	);
};

export default Signupform;
