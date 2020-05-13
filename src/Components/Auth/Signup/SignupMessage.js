import React from 'react';
import PropTypes from 'prop-types';

const SignupMessage = ({ isSignup, signupError, isLoading }) => {
	// while loading
	if (isLoading) {
		return <div>Loading...</div>;
	}
	// if succesful signup
	if (isSignup) {
		return <div>Congrats, you are in. You can now log in</div>;
	}
	// if any signup error
	if (signupError) {
		return <div>{signupError}</div>;
	}
	return <div />;
};

SignupMessage.propTypes = {
	isSignup: PropTypes.bool.isRequired,
	signupError: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default SignupMessage;
