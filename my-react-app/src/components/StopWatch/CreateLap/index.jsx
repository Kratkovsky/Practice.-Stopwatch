import React from 'react';
import styles from './CreateLap.module.scss';

class CreateLap extends React.Component {
  render() {
    const { lapNumber, lapTime } = this.props;
    return (
      <div>
        <div className={styles.lap}>Lap {lapNumber}</div>
        <div>{lapTime}</div>
      </div>
    );
  }
}

export default CreateLap;
