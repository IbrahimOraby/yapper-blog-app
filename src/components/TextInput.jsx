import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				className={`text-input input w-full my-1  ${
					meta?.touched && meta?.error ? "border-error focus:border-error focus:outline-error" : ""
				} `}
				{...field}
				{...props}
			/>
			<div className="text-xs text-error min-h-0.5 mb-2">
				{meta?.touched && meta?.error ? meta.error : "\u00A0"}
			</div>
		</>
	);
};

export default MyTextInput;
