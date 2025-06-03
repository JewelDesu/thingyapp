type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageData: number;
};

type StaticData = {
    totalStorage: number;
    totalMem: number;
    cpuModel: string;
    hostName: string;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = "MINIMIZE" | "MAXIMIZE" | "CLOSE";

type EventPayload = {
    statistics: Statistics;
    getStaticData: StaticData;
    changeView: View;
    changeFrameAction: FrameWindowAction;
}

type UnsubscribeFunction = () => void;

interface Window {
    electron: {
        subscribeStatistics: (
            callback: (statistics: Statistics) => void
        ) => UnsubscribeFunction;
        getStaticData: () => Promise<StaticData>;

        subscribeChangeView: (
            callback: (view: View) => void
        ) => UnsubscribeFunction;

        changeFrameAction: (payload: FrameWindowAction) => void;
    }
}