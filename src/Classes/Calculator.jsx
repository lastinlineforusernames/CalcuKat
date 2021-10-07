import React from 'react';
import Display from './Display';
import Button from './Button';

var clearState = {
  input: 0,
  storedInput: null,
  operation: null,
  operationClicked: false,
  decimalClicked: false,
  receivedAnswer: false
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = clearState;
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.allClear = this.allClear.bind(this);
    this.calculateAnswer = this.calculateAnswer.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
  }
 
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown(e) {
    var key = document.getElementsByName(e.key)[0];
    if (key === undefined) return;
    this.handleClick(key);
  }

  handleClick(e) {
    var value = e.dataset.value;
    var buttonClass = e.className;
    e.className += " clicked";
    setTimeout(() => e.className = buttonClass, 100);
    switch (value) {
      case "AC":
        this.allClear();
        break;
      case "=":
        this.calculateAnswer();
        break;
      case "+":
      case "*":
      case "/":
      case "-": 
        this.handleOperation(value);
        break;
      case ".": 
        this.handleDecimal(value);
        break;
      default:
        this.handleNumbers(value);
    }
  }

  handleOperation(value) {
    if (this.state.operationClicked) {
      this.setState({
        operation: value,
        operationClicked: true
      });
    } else if (this.state.operation != null) {
      var result = eval(this.state.storedInput + this.state.operation + this.state.input);
      result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000
      this.setState({
        input: result,
        storedInput: result,
        operation: value,
        receivedAnswer: true,
        decimalClicked: false,
        operationClicked: true
      });
    } else {
      this.setState({
        storedInput: eval(this.state.input),
        operation: value,
        decimalClicked: false,
        operationClicked: true
      });
    }
  }

  handleDecimal(value) {
    if (this.state.decimalClicked) return;
    if (this.state.input === 0 || this.state.operationClicked) {
      this.setState({
        input: "0" + value,
        decimalClicked: true,
        operationClicked: false
      });
    } else {
      this.setState({
        input: this.state.input + value,
        decimalClicked: true,
        operationClicked: false
      })
    }
  }

  handleNumbers(value) {
    if (this.state.input === 0) {
      this.setState({
        input: value,
        operationClicked: false
      });
    } else if (this.state.receivedAnswer) {
      this.setState({
        input: value,
        receivedAnswer: false,
        operationClicked: false
      });
    } else if (this.state.operationClicked) {
      this.setState({
        input: value,
        operationClicked: false
      });
    } else {
      this.setState({
        input: this.state.input + value,
        operationClicked: false
      });
    }
  }

  calculateAnswer() {
    if (this.state.operation === null || this.state.storedInput === null) return;
    var result = eval(this.state.storedInput + this.state.operation + this.state.input);
    result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000
    this.setState({
      input: result,
      storedInput: result,
      operation: null,
      receivedAnswer: true,
      decimalClicked: false,
      operationClicked: false
    });
  }

  allClear() {
    this.setState(clearState);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="grid-container">
          <Display answer={this.state.input} />
          <Button id="1" className="number" value={1} handleClick={this.handleClick} />
          <Button id="2" className="number" value={2} handleClick={this.handleClick} />
          <Button id="3" className="number" value={3} handleClick={this.handleClick} />
          <Button id="4" className="number" value={4} handleClick={this.handleClick} />
          <Button id="5" className="number" value={5} handleClick={this.handleClick} />
          <Button id="6" className="number" value={6} handleClick={this.handleClick} />
          <Button id="7" className="number" value={7} handleClick={this.handleClick} />
          <Button id="8" className="number" value={8} handleClick={this.handleClick} />
          <Button id="9" className="number" value={9} handleClick={this.handleClick} />
          <Button id="0" className="wide number" value={0} handleClick={this.handleClick} />
          <Button id="." className="number" value="." handleClick={this.handleClick} />
          <Button id="Escape" className="ac" value="AC" handleClick={this.handleClick} />
          <Button id="+" className="tall function" value="+" handleClick={this.handleClick} />
          <Button id="-" className="function" value="-" handleClick={this.handleClick} />
          <Button id="*" className="function" value="*" handleClick={this.handleClick} />
          <Button id="/" className="function" value="/" handleClick={this.handleClick} />
          <Button id="Enter" className="tall function" value="=" handleClick={this.handleClick} />
        </div>
      </div>
    )
  }
}