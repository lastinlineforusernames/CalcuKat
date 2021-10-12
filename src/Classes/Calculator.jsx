import React from 'react';
import Display from './Display';
import Button from './Button';

var clearState = {
  input: '0',
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
    this.clear = this.clear.bind(this);
    this.calculateAnswer = this.calculateAnswer.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.doSomeMath = this.doSomeMath.bind(this);
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
    if (buttonClass.search(" clicked") < 0) {
      e.className += " clicked";
      setTimeout(() => e.className = buttonClass, 100);
    }
    if (this.state.input === "Error") {
      this.setState(clearState)
    }
    switch (value) {
      case "AC":
        this.allClear();
        break;
      case "C":
        this.clear();
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
    // console.log(this.state);
  }

  handleOperation(value) {
    let { operationClicked, 
          operation,
          input } = this.state;
    if (operationClicked) {
      this.setState({
        operation: value,
        operationClicked: true
      });
    } else if (operation != null) {
      var result = this.doSomeMath();
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
        storedInput: eval(input),
        operation: value,
        decimalClicked: false,
        operationClicked: true
      });
    }
  }

  handleDecimal(value) {
    let { decimalClicked, 
          operationClicked,
          input } = this.state;
    if (decimalClicked) return;
    if (input === 0 || input === "0" || operationClicked) {
      this.setState({
        input: "0" + value,
        decimalClicked: true,
        operationClicked: false
      });
    } else {
      this.setState({
        input: input + value,
        decimalClicked: true,
        operationClicked: false
      });
    } 
  }

  handleNumbers(value) {
    let { receivedAnswer,
          operationClicked,
          input } = this.state;
    if (input === 0 || input === "0") {
      this.setState({
        input: value,
        operationClicked: false
      });
    } else if (receivedAnswer) {
      this.setState({
        input: value,
        receivedAnswer: false,
        operationClicked: false
      });
    } else if (operationClicked) {
      this.setState({
        input: value,
        operationClicked: false
      });
    } else {
      this.setState({
        input: input + value,
        operationClicked: false
      });
    } 
  }

  calculateAnswer() {
    let { operation, storedInput } = this.state;
    if (operation === null || storedInput === null) return;
    var result = this.doSomeMath();
    this.setState({
      input: result,
      storedInput: result,
      operation: null,
      receivedAnswer: true,
      decimalClicked: false,
      operationClicked: false
    });
  }

  doSomeMath() {
    let { operation,
          storedInput,
          input } = this.state;
    var result = eval(storedInput + operation + input);
    // fix for floating point errors
    result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    return result;
  }

  allClear() {
    this.setState(clearState);
  }

  clear() {
    let input = this.state.input;
    if (typeof(input) === "number") return;
    if (input.length < 2) {
      this.setState({
        input: '0'
      });
    } else {
      this.setState({
        input: input.slice(0, -1)
      });
    }
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
          <Button id="Backspace" className="ac" value="C" handleClick={this.handleClick} />
          <Button id="+" className="function" value="+" handleClick={this.handleClick} />
          <Button id="-" className="function" value="-" handleClick={this.handleClick} />
          <Button id="*" className="function" value="*" handleClick={this.handleClick} />
          <Button id="/" className="function" value="/" handleClick={this.handleClick} />
          <Button id="Enter" className="tall function" value="=" handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}