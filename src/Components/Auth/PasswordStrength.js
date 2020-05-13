import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
	background-color: ${props =>
		props.passwordStrength < 3 ? 'red' : 'green'};
	color: ${props => (props.passwordStrength < 3 ? 'black' : 'white')};
`;

const PasswordStrength = props => {
	let verdict;
	if (props.passwordStrength === 0) {
		verdict = 'Poor';
	} else if (props.passwordStrength === 1) {
		verdict = 'Poor';
	} else if (props.passwordStrength === 2) {
		verdict = 'Ok';
	} else if (props.passwordStrength === 3) {
		verdict = 'Good';
	} else {
		verdict = 'Strong';
	}
	if (props.passwordStrength === null) {
		return null;
	}
	return (
		<StyledDiv passwordStrength={props.passwordStrength}>
			{`Password strength: ${verdict}`}
		</StyledDiv>
	);
};

PasswordStrength.propTypes = {
	passwordStrength: PropTypes.number.isRequired,
};

export default PasswordStrength;
