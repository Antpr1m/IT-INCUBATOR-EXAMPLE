import style from "./GlobalError.module.css"

const GlobalError = ({ globalError }) => {
	return (
		<>
			<div className={style.container}>
			</div>
			<div className={style.body}>
				<div className={style.errorText}>{globalError}</div>
			</div>
		</>
	)
}
export default GlobalError