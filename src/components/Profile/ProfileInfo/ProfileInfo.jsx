import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../img/user.png";
import { useState } from 'react';
import ProfileDescriptionForm from './ProfileDescriptionForm';
import GlobalError from '../../common/GlobalError/GlobalError';


const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

	const [editMode, setEditMode] = useState(false)

	if (!profile) {
		return <Preloader />
	}

	const mainFotoSelected = (e) => {
		if (e.target.files) {
			savePhoto(e.target.files[0])
		}
	}

	const changeEditMode = () => {
		setEditMode(true)			//открывается форма
	}

	const onSubmit = (formData) => {
		saveProfile(formData).then(() => { setEditMode(false) }) //promise
		//при отправке формы закрывается сама форма
	}

	return (
		<div>
			<div className={s.profile}>
				{/* <GlobalError /> */}
				<div className={s.profileImg}>
					<img src={profile.photos.large || userPhoto} alt='' />
				</div>

				<div className={s.profileAbout}>
					<div className={s.profileStatus}>
						<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
					</div>

					{/* initialValues - стартовое значение для инпутов reduxForm, передаем в компоненту с формой profile из глоб. стейта */}
					{editMode ? <ProfileDescriptionForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
						: <ProfileDescription profile={profile} isOwner={isOwner} changeEditMode={changeEditMode} />}
				</div>

				<div className={s.profileInputDownload}>
					{isOwner && <input type={"file"} onChange={mainFotoSelected} />}
				</div>

			</div>
		</div>
	)
}

const ProfileDescription = ({ profile, isOwner, changeEditMode }) => {
	return <div className={s.profileDescription}>


		<div className={s.profilFullname}>
			<b>Full name:</b> {profile.fullName}
		</div>

		<div className={s.profileJob}>
			<b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
		</div>

		{profile.lookingForAJob &&
			<div className={s.profileSkils}>
				<b>My professional skils:</b> {profile.lookingForAJobDescription}
			</div>}
		<div className={s.aboutMe}>
			<b>About me:</b> {profile.aboutMe}
		</div>
		<div className={s.contacts}>
			<b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
				return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
			})}
		</div>
		{isOwner && <button onClick={changeEditMode}>Edit profile</button>}
	</div>
}

//Компонента для отображения вложенного объекта
const Contact = ({ contactTitle, contactValue }) => {
	return (
		<div className={s.profileContacts}>
			<b>{contactTitle}</b>:{contactValue}
		</div>
	)
}

export default ProfileInfo;
