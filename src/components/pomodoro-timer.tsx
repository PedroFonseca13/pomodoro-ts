import React, { useState } from 'react';
import { useInterval } from '../hooks/use-interval';

interface Props {
  defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTimer(mainTimer - 1);
  }, 1000);
  return <div>pomodoro-timer {mainTimer}</div>;
}
