import { Field } from "redux-form"
import styles from "./InputForms.module.css"


export const Textarea = ({ input, meta: { touched, error }, ...props }) => {

	const hasError = touched && error

	return (
		<div className={styles.formControl + " " + (hasError ? styles.error : "")}>
			<div>
				<textarea {...input} {...props} />
			</div>
			<div>
				{hasError && <span>{error}</span >}
			</div>
		</div>
	)
}

export const Input = ({ input, meta: { touched, error }, ...props }) => {

	const hasError = touched && error

	return (
		<div className={styles.formControl + " " + (hasError ? styles.error : "")}>
			<div>
				<input {...input} {...props} />
			</div>
			<div>
				{hasError && <span>{error}</span >}
			</div>
		</div>
	)
}

//Дополнительные атрибуты приходят в props и деструктуризацией распоковываться в {...props}
export const createField = (placeholder, name, validators, component, props = {}, text = '') => (
	<div>
		<Field placeholder={placeholder} name={name}
			type="text" component={component}
			validate={validators}
			{...props}
		/>{text}
	</div>)


// const FormControl = ({ input, meta: { touched, error }, children }) => {
// 	const hasError = touched && error
// 	return (
// 		<div className={styles.formControl + " " + (hasError ? styles.error : "")}>
// 			<div>
// 				{children}
// 			</div>
// 			<div>
// 				{hasError && <span>{error}</span >}
// 			</div>
// 		</div>
// 	)
// }

// export const Textarea = (props) => {
// 	const { input, meta, child, ...restProps } = props
// 	return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
// }
// export const Input = (props) => {
// 	const { input, meta, child, ...restProps } = props
// 	return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }