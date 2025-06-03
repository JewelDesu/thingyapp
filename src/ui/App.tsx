
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
  useEffect(() => {
    window.electron.subscribeChangeView((view) => console.log(view));
  })

  return (
    <div className="App">
      <div className='chart'>
        <Chart data={cpu} maxDataPoints={10}/>
      </div>
    </div>
  );
}

export default App
