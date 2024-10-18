import React, { useState } from 'react';
import './index.css';
import Clips from './assets/Attach.png';
import Microphone from './assets/Microphone.png'
import Paper_Plane from './assets/Paper_Plane.png'

function Input({ onToggleText }) {
    const DivStyle = { //Estliza div que será a barra cinza de input no canto inferior da tela
        backgroundColor: '#2F2F2F',
        width: '90vw',
        height: '81px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
    };

    const ClipsStyle = { //Estiliza botão de clips (anexar arquivo)
        backgroundColor: '#2F2F2F',
        width: '52px',
        height: '52px',
        marginLeft: '1vw',
        marginRight: '2vw',
        marginTop: '0',
        cursor: 'pointer',

    };

    const InputStyle = { //Estiliza entrada de texto do usuário
        backgroundColor: '#2F2F2F',
        width: '70vw',
        height: '81px',
        borderStyle: 'none',
        fontSize: '30px',
    };

    const MicrophoneStyle = { //Estiliza botão de microfone (enviar áudio)
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
        marginLeft: '1.5vw',
        marginRight: '2vw',
        marginTop: '0',
        cursor: 'pointer',
    };

    const PaperPlaneStyle = { //Estliza botão de avião de papel (enviar texto escrito pelo usuário)
        backgroundColor: '#2F2F2F',
        width: '55px',
        height: '55px',
        marginTop: '0',
        marginLeft: '0vw',
        cursor: 'pointer',
    };

    const ImageStyle = { //Define fundo da imagem como o mesmo que o da div e do botão
        backgroundColor: '#2F2F2F'
    }

  return (
    <div style ={DivStyle}>
        <button style={ClipsStyle}>
            <img src={Clips} style={ImageStyle}/>
        </button>

        <input style={InputStyle}></input>

        <button style={MicrophoneStyle}>
            <img src={Microphone} style={ImageStyle}/>
        </button>

        <button style={PaperPlaneStyle} onClick={onToggleText}>
            <img src={Paper_Plane} style={ImageStyle}/>
        </button>
    </div>
  );
    
}
export default Input;