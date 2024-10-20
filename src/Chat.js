import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import LangflowClient from './LangflowClient';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

//const API_KEY = "sk-Ws3XgDdqZxa-sIfoih_G9WQpjr8GisDfodDOTQwRaVT3BlbkFJRPoOWUIbR72UDhNYCcKAUK-nnPksadcxq018O9v3MA"; //SamsAI
const API_KEY = "sk-qA5UKrsytzH8A8NjBi3te-gKfljSacPpyyK4h_fC0AT3BlbkFJTYHUr4vFiGZzm_Jf_wbIE1AUYfjOXTzbnPk7pg1kgA"; //Teste2

function Chat() {
    const [isVisible, setIsVisible] = useState(true);

    const [messages, setMessages] = useState([]) //Lista de mensagens vazia

    const handleSend = async (message) => {
        setIsVisible(false);
        const newMessage = {
            message: message,
            user: "user",
            direction: "outgoing",
        }

        const newMessages = [...messages, newMessage]; //Todas as mensagens antigas + a nova mensagem enviada

        //Atualiza o status da mensagem
        setMessages(newMessages);

        //Processa a mensagem (envia e exibe a resposta)
        await processMessageToSamsAI(newMessages);
    }

    async function processMessageToSamsAI(chatMessages){
            setMessages(
                [...chatMessages, {
                    message: "Olá, como vai?", //Coloca onde estiver o conteúdo
                    direction: "incoming",
                }]
            )
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centraliza verticalmente também
        height: '80vh',
        width: '100vw',
    };

    const ChatStyle={
        height: '80vh',
        width: '80vw',
        overflow: 'hidden',
        bottom: '30px',
        border: 'none',
        backgroundColor: 'transparent',
    }    

    //Precisa fixar o Input e estilizá-lo
    // Colocar <BemVindo isVisible={isVisible}/> em algum lugar quando puder
    return (
        <div style = {containerStyle}>
            <MainContainer style={ChatStyle}>
                <ChatContainer>
                    <MessageList
                    scrollBehavior= "smooth">
                        {messages.map((message, i) => {
                            return <Message key = {i} model = {message}/>
                        })}
                    </MessageList>
                    <MessageInput placeholder='Escreva uma mensagem...' onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;