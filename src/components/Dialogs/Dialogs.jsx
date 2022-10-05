import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messages/Message";
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/Forms/InputForms';
import { maxLength, required } from '../../utils/validators/validators'

const Dialogs = (props) => {
	let state = props.dialogsPage;


	let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />)
	let messagesElements = state.messages.map(m => <Message message={m.message} />)


	let addNewMessage = (values) => {
		props.sendMessage(values.messageText); //Отправка значений с textarea в global state 
	}
	//Рефакторинг: создание HOC в DialogsContainer для перехода на страницу 'login'
	/*    if(!props.isAuth) return <Navigate to={'/login'}/>*/


	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogElements}
			</div>
			<div>
				{messagesElements}
			</div>
			<AddMessageFormRedux onSubmit={addNewMessage} />
		</div>

	)
}

export default Dialogs;



const maxLength50 = maxLength(50)

const AddMessageForm = (props) => {
	return (
		//handleSubmit обработчик для сбора данных с формы
		<form onSubmit={props.handleSubmit} className={s.messages}>

			<div>
				<Field component={Textarea} name={'messageText'}
					placeholder={"Enter your message"}
					validate={[required, maxLength50]} />
			</div>
			<div>
				<button>Send Message</button>
			</div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessage' })(AddMessageForm)  //Создание HOC reduxForm для формы