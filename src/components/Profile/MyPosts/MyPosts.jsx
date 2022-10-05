import { Field, reduxForm } from 'redux-form';
import { maxLength, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/Forms/InputForms';
import s from './MyPosts.module.css';
import Post from './Post/Post';



const maxLength10 = maxLength(10)


//Форма
//newPostText использ. в обработчике формы
const AddNewPostForm = (props) => {
	//handleSubmit - сборщик формы
	//Textarea - кастомный элемент над реакт элементом
	return <form onSubmit={props.handleSubmit}>
		<div>
			<Field name="newPostText" component={Textarea} validate={[required, maxLength10]} placeholder={'Post message'} />
		</div>
		<div>
			<button>Add post</button>
			<button>Remove</button>
		</div>
	</form>
}

let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)			//инициализация формы




//Компонента  
const MyPosts = (props) => {
	let state = props.profilePage;
	let postsElement = state.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);


	let onAddPost = (values) => {			  //Обработчик формы
		props.addPost(values.newPostText); //Отправка значений с textarea в global state 
	}

	return (
		<div className={s.body}>
			<h3> My posts</h3>
			<AddNewPostFormRedux onSubmit={onAddPost} />
			<div className={s.posts}>
				{postsElement}
			</div>
		</div>
	)
}

export default MyPosts;



