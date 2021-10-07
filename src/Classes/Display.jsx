import React from 'react';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="display" className="display">
        <div id="answer">
          {this.props.answer}
        </div>
      </div>
    )
  }
}