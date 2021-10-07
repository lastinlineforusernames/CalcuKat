import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  };

  click(e) {
    this.props.handleClick(e.currentTarget);
  };

  render() {
    var label
    if (this.props.id === "Enter") {
      label = "=";
    } else if (this.props.id === "Escape") {
      label = "AC";
    } else {
      label = this.props.id
    }
    return(
      <div id={this.props.id}
           name={this.props.id}
           className={`button ${this.props.className}`} 
           data-value={this.props.value} 
           onClick={e => this.click(e)}>
        {label}
      </div>
    );
  };
}