
import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useStatistics } from './statistics'
import { Chart } from './Charts';

function App() {
  const [activeView, setActiveView] = useState<View>('CPU');
  const statistics = useStatistics(10);
  const cpu = useMemo(() => statistics.map((stat) => stat.cpuUsage),[statistics]);
  const ram = useMemo(() => statistics.map((stat) => stat.ramUsage),[statistics]);
  const storage = useMemo(() => statistics.map((stat) => stat.storageData),[statistics]);
  const active = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpu;
      case "RAM":
        return ram;
      case "STORAGE":
        return storage;
    }
  },[activeView, cpu, ram, storage]);


   useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <div className="App">
      <header>
        <button id="minimize" onClick={() => window.electron.changeFrameAction('MINIMIZE')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
          </svg>
        </button>
        <button id="maximize" onClick={() => window.electron.changeFrameAction('MAXIMIZE')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          </svg>
        </button>
        <button id="close" onClick={() => window.electron.changeFrameAction('CLOSE')}>X</button>
      </header>
      <div className='chart'>
        <Chart data={active} maxDataPoints={10}/>
      </div>
    </div>
  );
}

export default App
