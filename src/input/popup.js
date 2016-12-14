import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

export class InputPopup extends Component {
	constructor() {
		super();
		this.state = {
			peoples: [],
			selected: 0,
		};
		this.triggerKeyboard = this.triggerKeyboard.bind(this);
	}

	getData() {
		return this.props.predicate.data;
	}

	triggerKeyboard(e) {
		const { predicate, keyword } = this.props;
		const peoples = this.getData().filter((record) => predicate.selector(record, keyword));
		let { selected } = this.state;
		switch(e.keyCode) {
			case 38: // up arrow
				if(selected === 0) {
					selected = peoples.length - 1;
				} else {
					selected--;
				}
				this.hoverIt(selected)
				break;
			case 40: // down arrow
				if(selected === peoples.length-1) {
					selected = 0;
				} else {
					selected++;
				}
				this.hoverIt(selected)
				break;
			case 9: // tab
			case 13: // enter
				const people = peoples[this.state.selected];
				this.selectIt(people[predicate.key]);
				break;
			default:
				break;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.keyword !== nextProps.keyword) {
			this.setState({ selected: 0 });
		} else if(this.getData().find((record) => nextProps.keyword === record[nextProps.predicate.key])) {
			this.props.onDone();
		}
	}

	hoverIt(i) {
		this.setState({ selected: i });
	}

	selectIt(username) {
		if (this.props.onSelect) {
			this.props.onSelect(username);
		}
	}

	render() {
		const { selected } = this.state;
		const { show, keyword, predicate } = this.props;
		const title = <div>People </div>;
		return (
			<div className="custom-popup">
				{
					show &&
					<Panel expanded={show} header={title}>
						<ul>
							{
								this.getData().filter((record) => predicate.selector(record, keyword))
								.map((record, i) => {
									const username = record[predicate.key];
									return (
										<li
											key={i}
											className={selected === i ? 'selected' : ''}
											onMouseEnter={() => this.hoverIt(i)}
											onClick={() => this.selectIt(username)}
										>
											{
												React.cloneElement(predicate.element, record)
											}
										</li>
									);
								})
							}
						</ul>
					</Panel>
				}
			</div>
		);
	}
};

InputPopup.propTypes = {
	show: PropTypes.bool,
	keyword: PropTypes.string,
	predicate: PropTypes.object,
	onSelect: PropTypes.func,
	onDone: PropTypes.func,
};

InputPopup.defaultProps = {
	show: false,
	keyword: '',
}

export default InputPopup;
