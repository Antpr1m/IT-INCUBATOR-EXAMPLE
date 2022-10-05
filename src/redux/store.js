import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', likesCount: 11},
                {id: 2, message: "It's my first post", likesCount: 12},
                {id: 3, message: "I'm Lenochka-beauty kitty", likesCount: 88},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Seva'},
                {id: 2, name: 'Anton'},
                {id: 3, name: 'Lena'},
                {id: 4, name: 'Lisa'},
                {id: 5, name: 'Sergey'},
                {id: 6, name: 'Roma'},
                {id: 7, name: 'Masha'},
                {id: 8, name: 'Sasha'},
            ],
            messages: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: "What's your name?"},
                {id: 3, message: 'Mau-mau!!!'},
                {id: 4, message: 'Yo!Yo!Yo!'},
                {id: 5, message: 'Mau-mau-mau!!!'},
            ],
            newMessageText: ""
        },
        sidebar: {
            friends: [
                {name: 'Seva'},
                {name: 'Anton'},
                {name: 'Lena'},
            ]
        }
    },
    _callSubscriber() {
        console.log("Stay changed")
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; //observer-pattern
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}


export default store;







