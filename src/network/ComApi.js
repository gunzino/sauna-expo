import ReconnectingWebsocket from 'reconnecting-websocket';
import config from '../../config';
import { setState } from '../context/context';

const initialState = {
    loaded: false, status: 0, temperature: 37, setTemperature: 0, humidity: 80
};

let client
class NetworkClient {
    constructor(ip) {
        this.client = new ReconnectingWebsocket(ip);
        this.ip = ip;
        this.actualSaunaState = initialState;
        this.client.onopen = () => this.connectionOpened();
        this.client.onclose = () => this.connectionClosed();
        this.client.onmessage = (message) => this.onMessage(message);
    }

    connectionClosed() {
        this.connected = false;
    }

    connectionOpened() {
        this.connected = true;
        this.client.send(JSON.stringify({
            type: "getActualSaunaState"
        }));
    }

    onMessage(message) {
        let data;
        try {
            data = JSON.parse(message.data);
        } catch (e) {
            console.log(e);
        }
        if (data) {
            if (data.type == "actualSaunaState") {
                this.actualSaunaState = data.data;
                this.actualSaunaState.loaded = true;
                setState(this.actualSaunaState);
            }
        }
    }

    sendMessage(data) {
        if (this.connected) {
            this.client.send(data);
        }
    }

    getActualSaunaState() {
        return this.actualSaunaState;
    }

    setActualSaunaState(data) {
        this.actualSaunaState = data;
        this.actualSaunaState.loaded = true;
    }

    getSetTemperature() {
        return this.actualSaunaState.setTemperature;
    }

    setTemperature(value) {
        this.sendMessage(JSON.stringify({
                type: "setTemperature",
                data: {
                    temperature: value
                }
            })
        );
    }

    switchSauna() {
        let changeStatus = 1;
        if (this.actualSaunaState.status == 1) {
            changeStatus = 0;
        }
        this.sendMessage(JSON.stringify({
            type: "setSaunaStatus",
            data: {
                status: changeStatus
            }
        }));
    }

}

export const initws = () => {
        client = new NetworkClient(config.ip);
        return client
    }

export const getws = () => {
        return client;
}

export { initialState as initialSaunaState };