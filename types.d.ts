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

type EventPayload = {
    statistics: Statistics;
    getStaticData: StaticData;
}

type UnsubscribeFunction = () => void;

interface Window {
    electron: {
        subscribeStatistics: (
            callback: (statistics: Statistics) => void
        ) => UnsubscribeFunction;
        getStaticData: () => Promise<StaticData>;
    }
}