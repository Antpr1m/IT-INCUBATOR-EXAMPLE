import { PhotosType, ProfileType } from "../types/types";
import { instance, ResponseType } from "./api";



type SavePhotoResponseDataType = {
	photos: PhotosType
}

export const profileAPI = {
	getProfile(userId: number) {
		return instance.get<ProfileType>(`profile/` + userId);
	},
	getStatus(userId: number) {
		return instance.get<string>(`profile/status/` + userId);
	},
	updateStatus(status: string) {
		return instance.put<ResponseType>(`profile/status/`, { status: status });
	},
	savePhoto(photoFile: any) {
		const formData = new FormData(); //Для отправки файла(не json)
		formData.append("image", photoFile);
		return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => res.data)
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile);
	}
};
