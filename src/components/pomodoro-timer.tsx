import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import secondsToTime from '../utils/seconds-to-time';
import Button from './button';
import Timer from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../assets/sounds/src_sounds_bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../assets/sounds/src_sounds_bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);
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
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

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

    audioStartWorking.play();
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

    audioStopWorking.play();
  };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTimer > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTimer,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
  ]);

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
        <p>Completed cycles: {completedCycles}</p>
        <p>Worked hours: {secondsToTime(fullWorkingTime)}</p>
        <p>completed Pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
