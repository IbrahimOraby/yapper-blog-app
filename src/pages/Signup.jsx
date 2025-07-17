import { Form, Formik } from "formik";
import { signUpUser } from "../services/auth_service";
import * as Yup from "yup";
import MyTextInput from "../components/TextInput";
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router";

function Signup() {
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: ""
			}}
			validationSchema={Yup.object({
				firstName: Yup.string()
					.max(15, "Must be 15 characters or less")
					.required("Required"),
				lastName: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
				email: Yup.string().email("Invalid email address").required("Required"),
				password: Yup.string()
					.required("Password is required")
					.min(6, "Password must be at least 6 characters"),
				confirmPassword: Yup.string()
					.required("Confirm Password is required")
					.oneOf([Yup.ref("password")], "Passwords must match")
			})}
			onSubmit={async (values, actions) => {
				console.log("values: ", values);
				console.log("actions: ", actions);

				try {
					const userCred = await signUpUser(
						`${values.firstName} ${values.lastName}`,
						values.email,
						values.password
					);
					console.log(userCred);
					navigate("/", { replace: true });
				} catch (err) {
					console.error(err);
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="bg-base-200 border-base-300 rounded-box w-md border p-8 space-y-4">
					<FormHeader>Sign Up</FormHeader>

					<div className="flex flex-col">
						<MyTextInput
							label="First Name"
							name="firstName"
							type="firstName"
							placeholder="John"
						/>
					</div>

					<div className="flex flex-col">
						<MyTextInput
							label="Last Name"
							name="lastName"
							type="lastName"
							placeholder="Doe"
						/>
					</div>

					<div className="flex flex-col">
						<MyTextInput
							label="Email Address"
							name="email"
							type="email"
							placeholder="jonedoe@example.com"
						/>
					</div>

					<div className="flex flex-col">
						<MyTextInput label="Password" name="password" type="password" />
					</div>

					<div className="flex flex-col">
						<MyTextInput
							label="Confirm Password"
							name="confirmPassword"
							type="password"
						/>
					</div>

					<div className="h-1"></div>
					<button className="btn btn-neutral mt-4 w-full" type="submit">
						{isSubmitting ? "Signing Up..." : "Sign Up"}
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default Signup;
