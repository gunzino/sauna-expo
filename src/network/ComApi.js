let client

export const initws = () => {
    client = new WebSocket('ws://gunzodus.net:1337');
    return client
}

export const getws = () => {
    return client;
}