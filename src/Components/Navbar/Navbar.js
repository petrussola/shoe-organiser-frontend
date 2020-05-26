// DEPENDENCIES
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import Logout from '../Auth/Logout/Logout';

const StyledNav = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const Navbar = ({ isLoggedIn, setIsLoggedIn, history }) => {
	if (isLoggedIn) {
		return (
			<StyledNav>
				<Logout setIsLoggedIn={setIsLoggedIn} history={history} />
			</StyledNav>
		);
	}
	return (
		<StyledNav>
			<NavLink to='/login'>Login</NavLink>
			<NavLink to='/signup'>Register</NavLink>
		</StyledNav>
	);
};

Navbar.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	setIsLoggedIn: PropTypes.bool.isRequired,
	history: PropTypes.objectOf(PropTypes.object),
};

export default Navbar;
