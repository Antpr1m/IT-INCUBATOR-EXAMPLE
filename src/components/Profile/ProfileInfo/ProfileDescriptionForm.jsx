import { reduxForm } from "redux-form"
import { required } from "../../../utils/validators/validators"
import { createField, Input, Textarea } from "../../common/Forms/InputForms"
import s from './ProfileInfo.module.css';
import style from '../../common/Forms/InputForms.module.css'


//error - ошибка из thunk-creator 'saveProfile()', возникающая при неправильном заполнении редакс формы
const ProfileDescriptionForm = ({ profile, handleSubmit, error }) => {
	return <form onSubmit={handleSubmit}>
		<div>

			<div>
				<b>Full name:</b> {createField('Full name', 'fullName', [required], Input)}
			</div>

			<div>
				<b>Looking for a job:</b> {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
			</div>

			<div>
				<b>My professional skils:</b> {createField('Type you professional skils', 'lookingForAJobDescription', [], Textarea)}
			</div>


			<div>
				<b>About me:</b> {createField('About me', 'aboutMe', [], Textarea)}
			</div>
			<div>
				<b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
					return <div key={key} className={s.contacts}>

						{/* для отображения вложенного объекта name для reduxForm 'contacts.' + key */}
						<b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
					</div>
				})}
			</div>
			{/* если есть ошибка, то покажеться div с ошибкой */}
			{error && <div className={style.formSummaryError}>{error}</div>}
			<button>Save</button>
		</div>
	</form>
}

const ProfileDescriptionReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDescriptionForm)

export default ProfileDescriptionReduxForm