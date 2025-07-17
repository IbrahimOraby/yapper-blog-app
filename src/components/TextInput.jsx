import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input input w-full mb-0.5" {...field} {...props} />
			<div className="text-xs text-red-500 min-h-0.5 mb-0.5">
				{meta?.touched && meta?.error ? meta.error : "\u00A0"}
			</div>
		</>
	);
};

export default MyTextInput;
