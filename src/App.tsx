import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="App">
      <p>Tá rolando, papai! 👽</p>
      <PomodoroTimer defaultPomodoroTimer={1500} />
    </div>
  );
}

export default App;
