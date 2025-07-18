import { useField } from "formik";

const MyTextAreaInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label className="" htmlFor={props.id || props.name}>{label}</label>
			<textarea
				className={`textarea textarea-bordered w-full my-1 ${
					meta?.touched && meta?.error
						? "border-error focus:border-error focus:outline-error"
						: ""
				}`}
				{...field}
				{...props}
			></textarea>
			<div className="text-xs text-error min-h-0.5 mb-2">
				{meta?.touched && meta?.error ? meta.error : "\u00A0"}
			</div>
		</>
	);
};

export default MyTextAreaInput;
