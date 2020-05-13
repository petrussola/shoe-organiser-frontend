/* eslint-disable jsx-a11y/label-has-associated-control */
// dependencies
import React, { useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';

// helper
import { schema } from '../../Helpers/Formvalidation';

// components
import SignupMessage from './SignupMessage';
import ValidationMessage from './ValidationMessage';
import PasswordStrength from './PasswordStrength';

// styles
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	label {
		height: 3rem;
	}
	span {
		background-color: red;
		margin-left: -25px;
	}
`;

const initialSignupUser = {
	email: '',
	password: '',
	name: '',
	last_name: '',
};

const Signupform = () => {
	const [signUpUser, setSignUpUser] = useState(initialSignupUser); // state of form content
	const [passwordStrength, setpasswordStrength] = useState(null); // password strength
	const [isLoading, setIsLoading] = useState(false); // displays loading message while waiting for Promise to resolve
	const [isSignup, setIsSignup] = useState(false); // succesful signup
	const [signupError, setSignupError] = useState(null); // in case sign up error. Store a string that gets displayed in case of error
	const [validationError, setValidationError] = useState([]); // stores array of validation error messages, if any
	const [passwordHidden, setPasswordHidden] = useState(true); // is password in password field hidden

	const onSignupFormChange = e => {
		setSignUpUser({
			...signUpUser,
			[e.target.id]: e.target.value,
		});
		if (signUpUser.password.length === 0) {
			setpasswordStrength(null);
		} else {
			const { score } = zxcvbn(signUpUser.password);
			setpasswordStrength(score);
		}
	};

	const onSignupSubmitForm = async e => {
		e.preventDefault();
		setValidationError([]); // clear validation errors, if any
		setSignupError(null); // clear error messages
		if (passwordStrength < 3) {
			setpasswordStrength(null);
			setValidationError(['Dude, choose a stronger password']);
			return;
		}
		try {
			const validatedUser = await schema.validate(signUpUser, {
				abortEarly: false,
			}); // yup validation
			setIsLoading(true); // activates loading spinner
			setpasswordStrength(null);
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

	const togglePassword = () => {
		setPasswordHidden(!passwordHidden);
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

			<StyledForm onSubmit={onSignupSubmitForm}>
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
						type={passwordHidden ? 'password' : 'text'}
						name='password'
						id='password'
						value={signUpUser.password}
						onChange={onSignupFormChange}
					/>
					<span
						className='pw-icon'
						onClick={() => {}}
						onKeyDown={togglePassword}
						role='button'
						tabIndex={0}
					>
						X
					</span>
					<PasswordStrength passwordStrength={passwordStrength} />
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
			</StyledForm>
		</div>
	);
};

export default Signupform;
