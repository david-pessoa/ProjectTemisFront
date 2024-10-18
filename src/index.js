import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainScreen from './MainScreen';
import Chat from './Chat'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MainScreen/>,
    document.getElementById('root'));
registerServiceWorker();

//Substituir depois Chat por Conversa