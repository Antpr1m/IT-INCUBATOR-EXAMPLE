import { GetItemsType, instance, ResponseType } from "./api";



export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)

	},
	follow(userId: number) {
		return instance.post<ResponseType>(`follow/${userId}`, {});
	},
	unfollow(userId: number) {
		return instance.delete<ResponseType>(`follow/${userId}`)
	}
};
