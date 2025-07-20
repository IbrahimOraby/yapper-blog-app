import { Form, Formik } from "formik";
import * as Yup from "yup";
import { signInUser } from "../services/auth_service";
import { useNavigate } from "react-router";
import MyTextInput from "../components/TextInput";
import FormHeader from "../components/FormHeader";

function Login() {
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				email: "",
				password: ""
			}}
			validationSchema={Yup.object({
				email: Yup.string().email("Invalid email address").required("Email is Required"),
				password: Yup.string()
					.required("Password is required")
					.min(6, "Password must be at least 6 characters")
			})}
			onSubmit={async (values, actions) => {
				try {
					const userCred = await signInUser(values.email, values.password);
					console.log(userCred);
					navigate("/", { replace: true });
				} catch (err) {
					console.error(err);
					actions.setStatus("Invalid email or password.");
				} finally {
					actions.setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, status }) => (
				<div className="flex items-center">
					<Form className=" bg-base-200 border-base-300 rounded-box w-xs md:w-md border p-8">
						<FormHeader>Sign In</FormHeader>

						<div className="flex flex-col">
							<MyTextInput
								label="Email Address"
								name="email"
								type="email"
							/>
						</div>

						<div className="flex flex-col">
							<MyTextInput label="Password" name="password" type="password" />
						</div>

						<button
							type="submit"
							className={`btn btn-neutral mt-4 w-full mb-0.5 ${
								isSubmitting && "btn-disabled"
							}`}
						>
							{isSubmitting ? "Logging in..." : "Login"}
						</button>

						<div className="text-xs text-error min-h-0.5 ">
							{status ? status : "\u00A0"}
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
}

export default Login;
