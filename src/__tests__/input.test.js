import React from 'react';
import renderer from 'react-test-renderer';

import { Avatar as RenderAvatar, matchNames } from '../Avatar';
import InputControl from '../input';
import { findByTag } from '../helpers';

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      focus() {},
			selectionStart: 0,
    };
  }
  return null;
}

const peoples = [
	{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0TBEUYUF-ga0b7c75171c-48', username: 'itsmemyk', fullName: 'Mayank Mahadevwala' },
	{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0T3Y7YE9-g741fb107a95-48', username: 'sos', fullName: 'Soham Solanki' },
	{ thumb: 'https://ca.slack-edge.com/T0S9307C3-USLACKBOT-sv1444671949-48', username: 'tirupa', fullName: 'Tirupa Magroliya' },
	{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0SS32SG7-g4c8f334018e-48', username: 'amit', fullName: 'Amit Patel' },
	{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U10AWP6A1-g6c660b98934-48', username: 'bhavikkheni', fullName: 'Bhavik Kheni' },
	{ username: 'everyone', fullName: 'Notify everyone in your team' },
	{ username: 'here', fullName: 'Notify everyone in your team' },
];

describe('Featured Input Component', () => {
	let app, tree, onChange;
	let snap = () => {
		return tree = app.toJSON();
	}

	beforeEach(() => {
		app = renderer.create(
				<InputControl
					onChange={onChange}
					tagSymbol="@"
					data={peoples}
					predicate={{
						key: 'username',
						selector: matchNames,
						element: <RenderAvatar />,
					}}
				/>
		, { createNodeMock });
	});

	it('Should render correctly', () => {
		expect(snap()).toMatchSnapshot();
	});


	it('Should show popup on tag char i.e. @', () => {
		expect(snap()).toMatchSnapshot();
		let input = findByTag(tree, 'input');
		input.props.onChange({ target: { value: '@' }});
		expect(snap()).toMatchSnapshot();
	});
});