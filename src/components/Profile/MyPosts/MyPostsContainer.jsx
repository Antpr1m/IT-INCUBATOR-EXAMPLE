import { actions } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";


/*const MyPostsContainer = (props) => {
	 let state = props.store.getState().profilePage; //getting state from store for <MyPosts />

	 let addPost = () => {
		  props.store.dispatch(addPostCreator());
	 }
	 let onPostChange = (text) => {
		  let action = updatePostTextCreator(text)
		  props.store.dispatch(action);
	 }

	 return (<MyPosts updateNewPostText={onPostChange}
							addPost={addPost}
							profilePage={state}/>)
}*/

let mapStateToProps = (state) => {
	return { profilePage: state.profilePage }
}
let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => dispatch(actions.addPostCreator(newPostText)),
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

