
import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { useStatistics } from './statistics'
import { Chart } from './Charts';
import  Header  from './Header';
import Options from './Options';

function App() {
  const [activeView, setActiveView] = useState<View>('CPU');
  const statistics = useStatistics(10);
  const statistics2 = useStatistics(1);
  const cpu = useMemo(() => statistics.map((stat) => stat.cpuUsage),[statistics]);
  const cpu2 = useMemo(() => statistics2.map((stat) => stat.cpuUsage),[statistics2]);
  const ram = useMemo(() => statistics.map((stat) => stat.ramUsage),[statistics]);
  const storage = useMemo(() => statistics.map((stat) => stat.storageData),[statistics]);
  const storage2 = useMemo(() => statistics2.map((stat) => stat.storageData),[statistics2]);
  const ramInUse = useMemo(() => statistics2.map((stat) => stat.ramInUse), [statistics2]);
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

  const activeInfo = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpu2;
      case "RAM":
        return ramInUse;
      case "STORAGE":
        return storage2;
    }
  },[activeView, cpu2, ramInUse, storage2]);


   useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <div className="App">
      <Header host={staticData?.hostName ?? ''}/>
      <div>
        <div className='window'>
          <div className='charts'>
            <Chart data={active} maxDataPoints={10} selectedView={activeView}/>
            <div>
              {activeView === 'CPU' ? `${Math.round(activeInfo[0] * 100)}%` : activeView === 'RAM' ? `${activeInfo} GB` : ''}
            </div> 
          </div>
          <div>
            <Options chart={cpu} title="CPU" view="CPU" subTitle={staticData?.cpuModel ?? ''} onClick={() => setActiveView('CPU')} />
            <Options chart={ram} title="RAM" view="RAM" subTitle={(staticData?.totalMem.toString() ?? '') + " GB"} onClick={() => setActiveView('RAM')} />
            <Options chart={storage} title="STORAGE" view="STORAGE" subTitle={(staticData?.totalStorage.toString() ?? '') + " GB"} onClick={() => setActiveView('STORAGE')} />
          </div>

        </div>   
   
      </div>
    </div>
  );
}

function getUserData() {
  const [userData, getUserData] = useState<StaticData | null>(null);

  useEffect(() => {
    (async () => {
      getUserData(await window.electron.getStaticData())
    })();
  },[]);

  return userData
}

export default App
