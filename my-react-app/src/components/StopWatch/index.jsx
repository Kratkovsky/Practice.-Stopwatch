// * Basic level:
// - Cекунды можно отображать как простое число;
// - Cделать кнопку запуска секундомера, при нажатии на которую раз в секунду увеличивать число;
// - Cделать кнопку остановки секундомера, при нажатии на которую он ставится на паузу;
// - Cделать базовую стилизацию для элементов секундомера;

import React from 'react';
import ControlPanel from './ControlPanel';
import CreateLap from './CreateLap';
import styles from './StopWatch.module.scss'

function asDate(date) {
  const dataStr = date.toLocaleTimeString('it-IT');

  return dataStr;
}

class StopWatch extends React.Component {
  state = {
    timeAsDate: asDate(new Date(0, 0, 0, 0, 0, 0, 0)),
    myDate: new Date(0, 0, 0, 0, 0, 0, 0),
    timeValue: 0,
    laps: [],
    isRunning: false,
  };

  step = () => {
    const { myDate, timeValue, isRunning } = this.state;

    const newDate = new Date(myDate);

    newDate.setTime(newDate.getTime() + 1000);

    if (isRunning) {
      this.setState({
        timeValue: timeValue + 1,
        timeAsDate: asDate(newDate),
        myDate: newDate,
      });
    }
  };

  start = () => {
    this.setState({
      isRunning: true,
    });
    this.timerId = setInterval(this.step, 1000);
  };

  stop = () => {
    clearInterval(this.timerId);
    this.setState({
      isRunning: false,
    });
  };

  reset = () => {
    clearInterval(this.timerId);
    this.setState({
      timeAsDate: asDate(new Date(0, 0, 0, 0, 0, 0, 0)),
      myDate: new Date(0, 0, 0, 0, 0, 0, 0),
      timeValue: 0,
      laps: [],
      isRunning: false,
      isPaused: false,
    });
  };

  lap = () => {
    const { laps, timeAsDate } = this.state;

    this.setState({
      laps: [...laps, timeAsDate],
    });
  };

  componentDidMount() {
    const { isRunning } = this.state;
    if (isRunning) {
      this.setState({
        isRunning: true,
      });
      this.timerId = setInterval(this.step, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleStartStop = () => {
    this.setState((prevState) => ({ isRunning: !prevState.isRunning }));
  };

  render() {
    const { timeAsDate, isRunning, laps } = this.state;

    return (
      <div className={styles.stopwatch}>
        <h1 className={styles.time}>{timeAsDate}</h1>
        <div className={styles.controls}>
        <ControlPanel
          isRunning={isRunning}
          start={this.start}
          stop={this.stop}
          reset={this.reset}
          lap={this.lap}
        />
        </div>

        
        <div className="laps">
          {laps.map((lapTime, index) => (
            <CreateLap key={index} lapNumber={index + 1} lapTime={lapTime} />
          ))}
        </div>

        {/* <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default StopWatch;
