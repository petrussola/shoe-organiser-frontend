import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styles
const StyledDiv = styled.div`
	color: red;
`;
const ValidationMessage = ({ item }) => {
	return <StyledDiv>{item}</StyledDiv>;
};

ValidationMessage.propTypes = {
	item: PropTypes.string,
};

export default ValidationMessage;
