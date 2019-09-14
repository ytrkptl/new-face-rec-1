import React from 'react';
import './Rank.css';

class Rank extends React.Component {
	constructor() {
		super();
		this.state = {
			emoji: ''
		}
	}

	componentDidMount() {
		this.generateEmoji(this.props.entries)
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.entries === this.props.entries && prevProps.name===this.props.name){
			return null
		}
		this.generateEmoji(this.props.entries)	
	}

	generateEmoji = (entries) => {
		fetch(`${process.env.REACT_APP_LAMBDA_RANK_QUERY}${entries}`)
			.then(response => response.json())
			.then(data => this.setState({emoji: data.input}))
			.catch(console.log)
	}

	render() {
		return(
			<div className="rankParent">
				<div className='rankText'>
					{`${this.props.name}, your current entry count is...`}
				</div>
				<div className='rankNumber'>
					{this.props.entries}
				</div>
				<div className='rankText'>
					{`Rank Badge: ${this.state.emoji}`}
				</div>
				<div className='rankText'>
					{`This Magic Brain will detect faces in your pictures. Give it a try.`}
				</div>
			</div>
		)
	}
}

export default Rank;