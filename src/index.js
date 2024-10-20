import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainScreen from './MainScreen';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MainScreen/>
);
registerServiceWorker();

//Substituir depois Chat por Conversa