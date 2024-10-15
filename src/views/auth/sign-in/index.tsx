import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PasswordField from '@/components/reusable/fields/PasswordField';
import insightsImg from '@/assets/img/others/insights.png';
import TextField from '@/components/reusable/fields/TextField';
import Cookies from 'js-cookie';
import Default from '@/layouts/auth/types/Default';
import * as yup from 'yup';

function SignIn() {
	const navigate = useNavigate();

	const initialValues = {
		email: '',
		password: '',
	};

	const handleFormSubmit = (values: any) => {
		Cookies.set(KEY_TOKEN_COOKIE, 'token');
		Cookies.set(
			KEY_USER_COOKIE,
			JSON.stringify({
				email: values?.email,
			})
		);
		navigate('/dashboard');
	};

	const formSchema = yup.object().shape({
		email: yup.string().required(`email address is required`),
		password: yup
			.string()
			.matches(/^(?=.{8,})/, `must contain 8 character`)
			.required(`password is required`),
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues,
		onSubmit: handleFormSubmit,
		validationSchema: formSchema,
	});

	return (
		<Default
			maincard={
				<form onSubmit={handleSubmit}>
					<div className='mb-16 md:mt-12 mt-0 flex  h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start'>
						<div className='md:mt-[10vh] mt-0 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]'>
							<img src={insightsImg} width={300} className='mb-10 m-auto md:hidden' />

							<h3 className='mb-2.5 text-4xl font-bold text-primary dark:text-white'>Sign In</h3>
							<p className='mb-9 ml-1 text-base text-gray-600'>Enter your email and password to sign in!</p>

							<TextField
								label={`email`}
								placeholder={`Email`}
								name='email'
								type='email'
								onBlur={handleBlur}
								value={values.email}
								onChange={handleChange}
								error={!!touched.email && !!errors.email}
								helperText={touched.email && errors.email}
							/>

							<PasswordField
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.password}
								touched={touched.password}
								errors={errors.password}
								label={`password`}
								placeholder={`Password`}
							/>

							<Button className='w-full mt-4'>
								<span>Sign in</span>
							</Button>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default SignIn;
