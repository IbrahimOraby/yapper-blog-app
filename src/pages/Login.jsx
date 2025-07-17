import { Form, Formik } from "formik";
import * as Yup from "yup";
import { signInUser } from "../services/auth_service";
import { useNavigate } from "react-router";
import MyTextInput from "../components/TextInput";

function Login() {
	const navigate = useNavigate();
	return (
		<Formik
			initialValues={{
				email: "",
				password: ""
			}}
			validationSchema={Yup.object({
				email: Yup.string().email("Invalid email address").required("Required"),
				password: Yup.string()
					.required("Password is required")
					.min(6, "Password must be at least 6 characters")
			})}
			onSubmit={async (values, actions) => {
				console.log("values: ", values);
				console.log("actions: ", actions);

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
				<Form className=" bg-base-200 border-base-300 rounded-box w-md border p-8">
					<div>
						<h1 className="text-4xl font-bold text-neutral">Sign In</h1>
						<p className="py-4 text-sm">
							Welcome to your corner of the internet. Let the yapping begin.
						</p>
					</div>
					<div className="flex flex-col">
						<MyTextInput
							label="Email Address"
							name="email"
							type="email"
							placeholder="jane@formik.com"
						/>
					</div>
					<div className="flex flex-col">
						<MyTextInput label="Password" name="password" type="password" />
					</div>

					<button type="submit" className="btn btn-neutral mt-4 w-full mb-0.5">
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
					{
						<div className="text-xs text-red-500 min-h-0.5 mb-1">
							{status ? status : "\u00A0"}
						</div>
					}
				</Form>
			)}
		</Formik>
	);
}

export default Login;
