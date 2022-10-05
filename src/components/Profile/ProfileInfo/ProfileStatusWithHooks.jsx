import React, { useState, useEffect } from "react";


const ProfileStatusWithHooks = (props) => {

	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	useEffect(() => {
		//после отрисовки компоненты синхронизировать статус со статусом из пропсов
		setStatus(props.status)
	}, [props.status])

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value)

	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	return (
		<>
			<div>
				{!editMode &&
					<div>
						<b>Status:</b> <span onDoubleClick={() => { setEditMode(true) }}>{props.status || "-----------"}</span>
					</div>
				}
				{editMode &&
					<div>
						<b>Status:</b> <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
					</div>
				}
			</div>
		</>
	)
}

export default ProfileStatusWithHooks;


