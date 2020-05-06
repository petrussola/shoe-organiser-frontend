/* eslint-disable jsx-a11y/label-has-associated-control */
// dependencies
import React, { useState } from 'react';
import axios from 'axios';

// helper
import { schema } from '../../Helpers/Formvalidation';

const initialSignupUser = {
	email: '',
	password: '',
	name: '',
	last_name: '',
};

const Signupform = () => {
	const [signUpUser, setSignUpUser] = useState(initialSignupUser);
	const [signupSuccess, setSignupSuccess] = useState();
	const [validationError, setValidationError] = useState();

	const onSignupFormChange = e => {
		setSignupSuccess(null);
		setSignUpUser({
			...signUpUser,
			[e.target.id]: e.target.value,
		});
	};

	const onSignupSubmitForm = e => {
		e.preventDefault();
		schema
			.validate(signUpUser, { abortEarly: false })
			.then(valid => {
				console.log(valid);
			})
			.catch(error => {
				setValidationError(error.errors);
			});
		setSignUpUser(initialSignupUser);
		axios
			.post(
				`${process.env.REACT_APP_BASE_URL}api/auth/register`,
				signUpUser
			)
			.then(() => {
				setSignupSuccess(true);
			})
			.catch(() => {
				setSignupSuccess(false);
			});
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
			<div>
				{signupSuccess === null
					? null
					: signupSuccess
					? 'Congrats, you are in. You can now log in'
					: 'There was an error, please try again'}
			</div>
			<div>
				{validationError ? validationError.map(item => item) : ''}
			</div>
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
