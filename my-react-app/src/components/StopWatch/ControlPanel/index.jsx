import { Component } from 'react';

class ControlPanel extends Component {
  
  handleToggle = () => {
    const { start, stop, isRunning } = this.props;
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  handlereset = () => {
    const { reset } = this.props;

    reset();
  };

  handleLap = () => {
    const { lap } = this.props;

    lap();
  };

  render() {
    const { isRunning } = this.props;

    return (
      <section>
        <button onClick={this.handleToggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.handlereset}>Reset</button>
        <button onClick={this.handleLap}>Lap</button>
      </section>
    );
  }
}

export default ControlPanel;
