
import { useMemo } from 'react';
import './App.css'
import { useStatistics } from './statistics'
import { Chart } from './Charts';

function App() {

  const statistics = useStatistics(10);
  const cpu = useMemo(() => statistics.map((stat) => stat.cpuUsage),[statistics]);

  return (
    <div className="App">
      <div className='chart'>
        <Chart data={cpu} maxDataPoints={10}/>
      </div>
    </div>
  );
}

export default App
