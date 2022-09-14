import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTimer={1500}
        shortRestTimer={420}
        longRestTimer={840}
        cycles={4}
      />
    </div>
  );
}

export default App;
