import { useField, useFormikContext } from "formik";

const MyFileInput = ({ label, ref, ...props }) => {
	const [field, meta] = useField(props);
	const { setFieldValue } = useFormikContext();

	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				type="file"
				ref={ref}
				className={`file-input file-input-bordered w-full my-1 ${
					meta?.touched && meta?.error
						? "border-error focus:border-error focus:outline-error"
						: ""
				}`}
				onChange={(event) => {
					setFieldValue(props.name, event.currentTarget.files[0]);
				}}
				{...props}
			/>
			<div className="text-xs text-error min-h-0.5 mb-0.5">
				{meta?.touched && meta?.error ? meta.error : "\u00A0"}
			</div>
		</>
	);
};

export default MyFileInput;
