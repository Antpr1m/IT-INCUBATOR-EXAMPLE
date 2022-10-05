import { Field, reduxForm } from "redux-form"
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/Forms/InputForms";
import { login } from "../../redux/auth-reducer"
import { connect, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import style from "../common/Forms/InputForms.module.css"


const Login = (props) => {

	const { isAuth } = useSelector(state => state.auth)
	const { captchaUrl } = useSelector(state => state.auth)

	const onSubmit = (formData) => {
		const { email, password, rememberMe, captcha } = formData //formData - данные из формы
		props.login(email, password, rememberMe, captcha)
	}

	if (isAuth) {
		return <Navigate to={'/profile'} />
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}



const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit}>

			{createField("Email", "email", [required], Input)}
			{/* type: "password" идет как дополнительный атрибут(аргумент), передаются в объекте */}
			{createField("Password", "password", [required], Input, { type: "password" })}
			{createField(null, "rememberMe", null, Input, { type: "checkbox" }, "Remember Me")}

			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

			{/* если есть ошибка, то покажеться div с ошибкой */}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default connect(null, { login })(Login);