import React from "react";


class ProfileStatus extends React.Component {

	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({ editMode: true })
	}

	deactivateEditMode = () => {
		this.setState({ editMode: false })
		this.props.updateStatus(this.state.status)//Обновление статуса на сервере и занесение его в глобальный state
	}

	onStatusChange = (e) => {
		this.setState({ status: e.currentTarget.value })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({ state: this.props.status })
		}
	}

	render() {
		console.log('render');
		return (
			<>
				<div>
					{!this.state.editMode &&
						<div>
							<span onDoubleClick={this.activateEditMode}>{this.props.status || "-----------"}</span>
						</div>
					}
					{this.state.editMode &&
						<div>
							<input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
						</div>
					}
				</div>
			</>
		)
	}
}

export default ProfileStatus;


