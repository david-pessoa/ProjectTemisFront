import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import Input from './Input.js'
import menu_hamburguer from './assets/Menu.png'
import profile_photo from './assets/Profile_Photo.png'
import Chat from './Chat.js'; 

function MainScreen(){
    const TopoStyle = { //Estiliza a div que é o topo da página, contendo o menu hambúrguer, o título "SamsAI" e a imagem de perfil
        display: 'flex',
        alignItems: 'center',
        paddingTop: '20px',
        marginLeft: '20px',
        marginBottom: '30px',
    }

    const TitleStyle={ // Estiliza o título
        fontWeight: '600',
        fontSize: '50px',
        marginLeft: '5vh',
        marginRight: '70vw',
    }
    /* Estliza o componente de Input
    const InputStyle={ 
        position: 'fixed', // Posiciona o elemento em relação à janela de visualização
        left: '5vw',
        width: '90vw',
        bottom: '4vh',
        display: 'flex',
        justifyContent: 'center',
    } */

        // Define um estado para controlar se o texto está visível ou não
        const [isVisible, setIsVisible] = useState(true);

        // Função para alternar a visibilidade do texto
        const toggleText = () => {
          setIsVisible(false); // Inverte o valor de isVisible
        };

        /*
        <BemVindo isVisible={isVisible}/> //Objetivo é incluir a mensagem de Bem Vindo, mas deixa pra depois
        
        <div style = {InputStyle}>
            <Input onToggleText={toggleText}/>
        </div>
        
        */

    return(
    <body>
        <div style = {TopoStyle}>
            <img src={menu_hamburguer}/>
            <h1 style = {TitleStyle}>SamsAI</h1> 
            <img src={profile_photo}/>
        </div>

        <Chat/>
    
    </body>
    );
}
export default MainScreen;