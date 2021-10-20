import React from 'react';

export default class LinkButton extends React.Component {
  constructor(props) {
    super(props);
    // this.click = this.click.bind(this);
  };

  click(e) {
    window.open(e.target.dataset.url);
  };

  render() {
    let { id, 
          url,
          text } = this.props;
    return (
      <div id={id}>
          <button className="linkbutton" 
                  data-url={url}
                  onClick={e => this.click(e)}>
            {text}
          </button>
      </div>
    );
  };
}