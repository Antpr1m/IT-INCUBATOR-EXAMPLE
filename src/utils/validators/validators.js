export const required = (value) => {			//Проверка на валидацию
	if (value) return undefined
	return 'Field is required'
}

export const maxLength = (maxValueLength) => (value) => {
	if (value.length > maxValueLength) return `Max length is ${maxValueLength} symbols`
	return undefined
}

