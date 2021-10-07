import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  };

  click(e) {
    this.props.handleClick(e.currentTarget);
  };

  render() {
    let { id, 
          className, 
          value } = this.props;
    var label = null;
    if (id === "Enter") {
      label = "=";
    } else if (id === "Escape") {
      label = "AC";
    } else {
      label = id
    }
    return (
      <div id={id}
           name={id}
           className={`button ${className}`} 
           data-value={value} 
           onClick={e => this.click(e)}>
        {label}
      </div>
    );
  };
}