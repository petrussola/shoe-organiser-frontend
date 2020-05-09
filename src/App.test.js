/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
	const { getByText } = render(
		<Router>
			<App />
		</Router>
	);
	const linkElement = getByText(/Register/i);
	expect(linkElement).toBeInTheDocument();
});
