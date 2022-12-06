import axios, { AxiosResponse } from "axios";
import { ResultCodesEnum, UserType } from "../types/types";

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "43c501a1-c980-4a6c-84ec-29688ec1c4cd"
	}
});

export type ResponseType<D = {}> = {
	data: D
	messages: Array<string>
	resultCode: ResultCodesEnum
}

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}