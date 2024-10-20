import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import LangflowClient from './LangflowClient';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

//const API_KEY = "sk-Ws3XgDdqZxa-sIfoih_G9WQpjr8GisDfodDOTQwRaVT3BlbkFJRPoOWUIbR72UDhNYCcKAUK-nnPksadcxq018O9v3MA"; //SamsAI
const API_KEY = "sk-URFSgdeBHnoqKDr-IqhREP1gL7MydtkQgY3Vp1Fd44T3BlbkFJFRMgJS_ZOXxi4X_ixfedYrz3QP3Z0vMAz2zf73L2sA"; //Teste2

function Chat() {
    const [isVisible, setIsVisible] = useState(true);

    const [messages, setMessages] = useState([
        {
            message: "Olá! Testando...",
            user: "ChatGPT",
            direction: "incoming",
        }
    ])

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
        //chatMessages { sender: "user" or "SamsAI", message: "Message Content..."}
        //apiMessages { role: "user" or "assistant", content: "Message Content..."}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "ChatGPT") {
                role = "assistant"
            }
            else
            {
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            role: "system",
            content: "Fale comigo como se eu fosse um advogado" //Usar para os filtros
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages],
        }

        await fetch("https://api.openai.com/v1/chat/completions", {method: "POST", 
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data)
            console.log(data.choices[0].message.content) //E assim vai até achar o conteúdo
            setMessages(
                [...chatMessages, {
                    message: data.choices[0].message.content, //Coloca onde estiver o conteúdo
                    sender: "ChatGPT",
                }]
            )
        });
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