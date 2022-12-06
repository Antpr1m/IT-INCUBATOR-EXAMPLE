import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

interface DialogType {
	id: number
	name: string
}

interface MessageType {
	id: number
	message: string
}

let initialState = {
	dialogs: [
		{ id: 1, name: 'Seva' },
		{ id: 2, name: 'Anton' },
		{ id: 3, name: 'Lena' },
		{ id: 4, name: 'Lisa' },
		{ id: 5, name: 'Sergey' },
		{ id: 6, name: 'Roma' },
		{ id: 7, name: 'Masha' },
		{ id: 8, name: 'Sasha' },
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'Hi!' },
		{ id: 2, message: "What's your name?" },
		{ id: 3, message: 'Mau-mau!!!' },
		{ id: 4, message: 'Yo!Yo!Yo!' },
		{ id: 5, message: 'Mau-mau-mau!!!' },
	] as Array<MessageType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case SEND_MESSAGE:
			let newMessage = action.messageText;
			return {
				...state,
				messages: [...state.messages, { id: 6, message: newMessage }]
			}
		default:
			return state;
	}
}

// Type for all actions
export const actions = {
	sendMessageCreator: (messageText: string) => ({ type: SEND_MESSAGE, messageText } as const)
}


//Thunk type
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> // Not needed yet


export default dialogsReducer;