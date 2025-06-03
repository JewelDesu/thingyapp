
import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useStatistics } from './statistics'
import { Chart } from './Charts';
import  Header  from './Header';
import Options from './Options';

function App() {
  const [activeView, setActiveView] = useState<View>('CPU');
  const statistics = useStatistics(10);
  const cpu = useMemo(() => statistics.map((stat) => stat.cpuUsage),[statistics]);
  const ram = useMemo(() => statistics.map((stat) => stat.ramUsage),[statistics]);
  const storage = useMemo(() => statistics.map((stat) => stat.storageData),[statistics]);
  const staticData = getUserData();

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
      <Header/>
      <div>
        <div className='window'>
          <div>
            <Options chart={cpu} title="CPU" subTitle={staticData?.cpuModel} onClick={() => setActiveView('CPU')} />
            <Options chart={ram} title="RAM" subTitle={staticData?.totalMem} onClick={() => setActiveView('RAM')} />
            <Options chart={storage} title="STORAGE" subTitle={staticData?.totalStorage} onClick={() => setActiveView('STORAGE')} />
          </div>
          <div className='charts'>
            <Chart data={active} maxDataPoints={10}/>
          </div>
        </div>        
      </div>
    </div>
  );
}

function getUserData() {
  const [userData, getUserData] = useState<StaticData | null> (null);

  useEffect(() => {
    (async () => {
      getUserData(await window.electron.getStaticData())
    })();
  },[]);

  return userData
}
export default App
