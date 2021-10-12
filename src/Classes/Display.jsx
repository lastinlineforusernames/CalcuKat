import React from 'react';
import { Textfit } from 'react-textfit';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "multi",
      forceSingleModeWidth: true
    };
  }

  render() {
    const { mode, forceSingleModeWidth } = this.state;
    return (
      <div id="display" className="display">
        <Textfit mode={mode} 
                 forceSingleModeWidth={forceSingleModeWidth} 
                 autoResize={true}
                 min={10}
                 max={100}
                 style={{ display: "flex",
                          justifyContent: "right",
                          alignItems: "center" }}
                 id="answer">
          {this.props.answer}
        </Textfit>
      </div>
    )
  }
}