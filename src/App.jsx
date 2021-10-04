import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 0,
      input: 0,
      previousOperand: '',
      decimalClicked: false,
      receivedAnswer: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown(e) {
    var key = document.getElementsByName(e.key)[0];
    console.log(e.key);
    this.handleClick(key);
  }

  handleClick(e) {
    var value = e.dataset.value;
    var buttonClass = e.className;
    e.className += " clicked";
    setTimeout(() => e.className = buttonClass, 100)
    switch (value) {
      case "AC":
        this.setState({
          input: 0,
          previousOperand: '',
          decimalClicked: false,
          receivedAnswer: false
        });
        break;
      case "=":
        var result = Math.round((eval(this.state.input || 0) 
                     + Number.EPSILON) * 100000000000) / 100000000000;
        this.setState({
          input: result,
          answer: result,
          previousOperand: '',
          receivedAnswer: true
        });
        break;
      case "+":
      case "*":
      case "/":
        if (this.state.previousOperand !== '' && this.state.previousOperand !== "-") {
          this.setState({
            input: (this.state.input.slice(0, this.state.input.length - 1) + value).replace(/^0/gm, ''),
            previousOperand: value,
            receivedAnswer: false
          });
        } else if (this.state.previousOperand === "-") {
          this.setState({
            input: (this.state.input.slice(0, this.state.input.length - 2) + value).replace(/^0/gm, ''),
            previousOperand: value,
            decimalClicked: false,
            receivedAnswer: false
          });
        } else {
          this.setState({
            input: (this.state.input + value).replace(/^0/gm, ''),
            previousOperand: value,
            decimalClicked: false,
            receivedAnswer: false
          });
        }
        break;
      case "-": 
        this.setState({
          input: (this.state.input + value).replace(/^0/gm, ''),
          previousOperand: value,
          decimalClicked: false,
          receivedAnswer: false
        });
        break;
      case ".": 
        if (this.state.decimalClicked) {
          break;
        } else {
          this.setState({
            input: (this.state.input + value).replace(/^0/gm, ''),
            previousOperand: '',
            decimalClicked: true
          });
        }
        break;
      default:
        if (this.state.receivedAnswer) {
          this.setState({
            input: (value).replace(/^0/gm, ''),
            previousOperand: '',
            receivedAnswer: false
          });
        } else {
          this.setState({
            input: (this.state.input + value).replace(/^0/gm, ''),
            previousOperand: ''
          });
        }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="grid-container">
          <div id="display" className="display">{this.state.input}</div>
          <div id="one" name="1" className="button number" data-value={1} onClick={e => this.handleClick(e.currentTarget)}>1</div>
          <div id="two" name="2" className="button number" data-value={2} onClick={e => this.handleClick(e.currentTarget)}>2</div>
          <div id="three" name="3" className="button number" data-value={3} onClick={e => this.handleClick(e.currentTarget)}>3</div>
          <div id="four" name="4" className="button number" data-value={4} onClick={e => this.handleClick(e.currentTarget)}>4</div>
          <div id="five" name="5" className="button number"data-value={5} onClick={e => this.handleClick(e.currentTarget)}>5</div>
          <div id="six" name="6" className="button number" data-value={6} onClick={e => this.handleClick(e.currentTarget)}>6</div>
          <div id="seven" name="7" className="button number" data-value={7} onClick={e => this.handleClick(e.currentTarget)}>7</div>
          <div id="eight" name="8" className="button number" data-value={8} onClick={e => this.handleClick(e.currentTarget)}>8</div>
          <div id="nine" name="9" className="button number" data-value={9} onClick={e => this.handleClick(e.currentTarget)}>9</div>
          <div id="zero" name="0" className="wide-button number" data-value={0} onClick={e => this.handleClick(e.currentTarget)}>0</div>
          <div id="decimal" name="." className="button number" data-value="." onClick={e => this.handleClick(e.currentTarget)}>.</div>
          <div id="clear" name="Escape" className="wide-button ac" data-value="AC" onClick={e => this.handleClick(e.currentTarget)}>AC</div>
          <div id="add" name="+" className="button function" data-value="+" onClick={e => this.handleClick(e.currentTarget)}>+</div>
          <div id="subtract" name="-" className="button function" data-value="-" onClick={e => this.handleClick(e.currentTarget)}>-</div>
          <div id="multiply" name="*" className="button function" data-value="*" onClick={e => this.handleClick(e.currentTarget)}>×</div>
          <div id="divide" name="/" className="button function" data-value="/" onClick={e => this.handleClick(e.currentTarget)}>÷</div>
          <div id="equals" name="Enter" className="wide-button function" data-value="=" onClick={e => this.handleClick(e.currentTarget)}>=</div>
        </div>
      </div>
    )
  }
}