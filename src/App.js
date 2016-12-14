import React, { Component } from 'react';
import InputControl from './input';
import { Avatar as RenderAvatar, matchNames } from './Avatar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			peoples: [],
		};
	}

	componentDidMount() {
		const peoples = [
			{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0TBEUYUF-ga0b7c75171c-48', username: 'itsmemyk', fullName: 'Mayank Mahadevwala' },
			{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0T3Y7YE9-g741fb107a95-48', username: 'sos', fullName: 'Soham Solanki' },
			{ thumb: 'https://ca.slack-edge.com/T0S9307C3-USLACKBOT-sv1444671949-48', username: 'tirupa', fullName: 'Tirupa Magroliya' },
			{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U0SS32SG7-g4c8f334018e-48', username: 'amit', fullName: 'Amit Patel' },
			{ thumb: 'https://ca.slack-edge.com/T0S9307C3-U10AWP6A1-g6c660b98934-48', username: 'bhavikkheni', fullName: 'Bhavik Kheni' },
			{ username: 'everyone', fullName: 'Notify everyone in your team' },
			{ username: 'here', fullName: 'Notify everyone in your team' },
		];
		this.setState({ peoples })
	}

  render() {
    return (
      <div className="App">
				<InputControl
					onChange={(e) => console.log('receive value', e)}
					tagSymbol="@"
					data={this.state.peoples}
					predicate={{
						key: 'username',
						selector: matchNames,
						element: <RenderAvatar />,
					}}
				/>
      </div>
    );
  }
}

export default App;
