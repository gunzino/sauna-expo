import React from 'react';

const appContext = React.createContext();

let setStateMethod = function() {
    console.log("Set state method not set yet!");
}

const configureSetStateMethod = (method) => {
    setStateMethod = method;
}

export { appContext as AppContext, setStateMethod as setState, configureSetStateMethod };