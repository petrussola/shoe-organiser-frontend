import React from 'react';
import PropTypes from 'prop-types';

const AuthMessage = ({ isAuthOk, authError, isLoading }) => {
	// while loading
	if (isLoading) {
		return <div>Loading...</div>;
	}
	// if succesful signup
	if (isAuthOk) {
		return <div>Congrats, you are in. You can now log in</div>;
	}
	// if any signup error
	if (authError) {
		return <div>{authError}</div>;
	}
	return <div />;
};

AuthMessage.propTypes = {
	isAuthOk: PropTypes.bool.isRequired,
	authError: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default AuthMessage;
