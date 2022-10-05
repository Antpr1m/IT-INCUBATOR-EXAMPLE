import profileReducer, { addPostCreator, deletePost } from "./profile-reducer";


let state = {
	posts: [
		{ id: 1, message: 'Hi! How are you?', likesCount: 11 },
		{ id: 2, message: "It's my first post", likesCount: 12 },
		{ id: 3, message: "I'm Lenochka-beauty kitty", likesCount: 88 },
	]
}

test('length of post should be incremented', () => {
	//1. test data
	let action = addPostCreator("Mau-mau!!!")

	//2. Действия
	let newState = profileReducer(state, action)
	//3. Ожидание
	expect(newState.posts.length).toBe(4)

});


test('message of new post should be correct', () => {
	//1. test data
	let action = addPostCreator("Mau-mau!!!")
	//2. Действия
	let newState = profileReducer(state, action)

	//3. Ожидание
	expect(newState.posts[3].message).toBe("Mau-mau!!!")
});


test('length of messages should be decrement after deleting', () => {
	//1. test data
	let action = deletePost(1)
	//2. Действия
	let newState = profileReducer(state, action)

	//3. Ожидание
	expect(newState.posts.length).toBe(3)
});


test(`length of messages stay the same if id incorrect `, () => {
	//1. test data
	let action = deletePost(1000)
	//2. Действия
	let newState = profileReducer(state, action)

	//3. Ожидание
	expect(newState.posts.length).toBe(3)
});

