import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import secondsToTime from '../utils/seconds-to-time';
import Button from './button';
import Timer from './timer';

interface Props {
  pomodoroTimer: number;
  shortRestTimer: number;
  longRestTimer: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = useState(props.pomodoroTimer);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTimer(props.pomodoroTimer);
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTimer(props.longRestTimer);
    } else {
      setMainTimer(props.shortRestTimer);
    }
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTimer} />
      <div className="controls">
        <Button text="work" onClick={() => configureWork()} />
        <Button text="rest" onClick={() => configureRest(false)} />

        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
          className={!working && !resting ? 'hidden' : ''}
        ></Button>
      </div>
      <div className="details">
        <p>Pedro Henrique Fonseca</p>
      </div>
    </div>
  );
}
