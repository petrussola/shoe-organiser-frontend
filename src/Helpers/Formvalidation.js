// dependencies
import * as yup from 'yup';

export const schema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required()
		.trim()
		.lowercase(),
	password: yup
		.string()
		.required()
		.min(8)
		.trim(),
	name: yup
		.string()
		.required()
		.trim(),
	last_name: yup
		.string()
		.required()
		.trim(),
});
