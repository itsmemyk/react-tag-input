import React, { Component, PropTypes } from 'react';

export const matchNames = ({ username, fullName }, keyword) => {
	keyword = keyword.toLowerCase();
	fullName = fullName.toLowerCase();
	username = username.toLowerCase();
	const splits = fullName.split(' ');
	return !keyword || (username.indexOf(keyword) > -1 || fullName.indexOf(keyword) > -1 || keyword === splits[0][0] + '' + splits[1][0]);
}

export class Avatar extends Component {
	render() {
		const { thumb, username, fullName } = this.props;
		return(
			<div>
				{
					thumb &&
					<span> <img src={thumb} alt={fullName} /> </span>
				}
				<b> {username} </b>
				<span> {fullName} </span>
			</div>
		);
	}
}

Avatar.propTypes = {
	username: PropTypes.string,
	thumb: PropTypes.string,
	fullName: PropTypes.string,
};

export default Avatar;
