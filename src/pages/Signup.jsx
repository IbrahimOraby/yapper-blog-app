import { Form, Formik } from "formik";
import { signUpUser } from "../services/auth_service";
import * as Yup from "yup";
import MyTextInput from "../components/TextInput";
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router";
import { createUser } from "../services/firestore-service";
import useAuthStore from "../store/useAuthStore";

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
					.required("First Name is Required"),
				lastName: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Last Name is Required"),
				email: Yup.string().email("Invalid email address").required("Email is Required"),
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
				// const userName = `${values.firstName} ${values.lastName}`;
				// console.log(userName);

				try {
					const userName = `${values.firstName} ${values.lastName}`;
					//signup
					const userCred = await signUpUser(
						userName,
						values.email,
						values.password
					);
					const uid = userCred.user.uid;

					//create user in firestore
					await createUser({
						uid,
						userName
					});

					useAuthStore.getState().setCurrentUser({
						uid,
						userName
					});

					//navigate to Home Page
					navigate("/", { replace: true });
				} catch (err) {
					console.error(err);
					actions.setStatus("Something went wrong.");
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, status }) => (
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
					<button
						className={`btn btn-neutral w-full ${
							isSubmitting && "btn-disabled"
						}`}
						type="submit"
					>
						{isSubmitting ? "Signing Up..." : "Sign Up"}
					</button>
					<div className="text-xs text-error min-h-0.5 ">
						{status ? status : "\u00A0"}
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default Signup;
