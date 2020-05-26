import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ setIsLoggedIn, history }) => {
	const logOutHandler = () => {
		localStorage.clear();
		history.replace('/');
		setIsLoggedIn(false);
	};
	return (
		<div
			role='button'
			tabIndex='0'
			onClick={() => {}}
			onKeyDown={logOutHandler}
			onMouseDown={logOutHandler}
		>
			Logout
		</div>
	);
};

Logout.propTypes = {
	setIsLoggedIn: PropTypes.bool.isRequired,
	history: PropTypes.objectOf(PropTypes.object),
};

export default Logout;
