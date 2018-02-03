import ReconnectingWebsocket from 'reconnecting-websocket';
import config from '../../config';

let client
class NetworkClient {
    constructor(ip) {
        this.client = new ReconnectingWebsocket(ip);
        this.ip = ip;
        this.messageListeners = [];
        this.listenerID = 0;
        this.actualSaunaState = {
            loaded: false, status: 0, temperature: 37, setTemperature: 0, humidity: 80
        }
        this.client.onopen = () => this.connectionOpened();
        this.client.onmessage = (message) => this.onMessage(message);
    }

    connectionOpened() {
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
            }
            if (this.messageListeners.length > 0) {
                this.messageListeners.forEach(function(listener) {
                    listener.callback(data);
                });
            }
        }
    }

    addNotifyCallback(callback) {
        let listenerID = this.listenerID++;
        this.messageListeners.push(
            {
                id: listenerID,
                callback: callback
            }
        );
        return listenerID;
    }

    removeNotifyCallback(listenerID) {
        this.messageListeners = this.messageListeners.filter(function(el) {
            return el.id !== listenerID;
        });
    }

    sendMessage(data) {
        this.client.send(data);
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
        this.client.send(JSON.stringify({
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
        this.client.send(JSON.stringify({
            type: "setSaunaStatus",
            data: {
                status: changeStatus
            }
            })
        );
    }

}

export const initws = () => {
        client = new NetworkClient(config.ip);
        return client
    }

export const getws = () => {
        return client;
}