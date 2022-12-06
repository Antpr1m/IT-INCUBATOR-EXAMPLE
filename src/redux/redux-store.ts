import { Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form"
import appReducer from "./app-reducer ";


let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});


type RootReduserType = typeof rootReducer
export type AppStateType = ReturnType<RootReduserType>

//Выделение типа для actions
// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// Типизация actions
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

// Типизация санки
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer)


export default store;