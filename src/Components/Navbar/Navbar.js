// DEPENDENCIES
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const Navbar = () => {
	return (
		<StyledNav>
			<NavLink to='/login'>Login</NavLink>
			<NavLink to='/signup'>Register</NavLink>
		</StyledNav>
	);
};

export default Navbar;
