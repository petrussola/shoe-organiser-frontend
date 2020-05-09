import React from 'react';
import PropTypes from 'prop-types';

const PasswordStrength = ({ passwordStrength }) => {
	let verdict;
	if (passwordStrength === 0 || passwordStrength === 1) {
		verdict = 'Poor';
	} else if (passwordStrength === 2) {
		verdict = 'Ok';
	} else if (passwordStrength === 3) {
		verdict = 'Good';
	} else {
		verdict = 'Strong';
	}
	return (
		<div>{!passwordStrength ? null : `Pasword strength: ${verdict}`}</div>
	);
};

PasswordStrength.propTypes = {
	passwordStrength: PropTypes.number.isRequired,
};

export default PasswordStrength;
