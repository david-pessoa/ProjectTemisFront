import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import LangflowClient from './LangflowClient';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';

const API_KEY = "AstraCS:eITJWgcxrHBmiMyuOBnJaQxw:f41642d1db696db910f69a8e3cc1753a69c51e2bcaa285f4e0e3805f2980dcc1";

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
        //await processMessageToSamsAI(newMessages);
        await getBotResponse(newMessages);
    }

    async function getBotResponse(userMessage) {
        const flowIdOrName = '789d10ee-9573-4333-8fe2-52c048315d3d';
        const langflowId = 'efde00ae-4d32-4471-8e8d-26482560f5a9';
        const inputValue = userMessage.message;
        const inputType = 'chat';
        const outputType = 'chat';
        const stream = false;
        const applicationToken = API_KEY;
        const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com',
            applicationToken);
        try{
            const tweaks = {
                "ChatInput-17Y07": {},
                "AstraVectorStoreComponent-Zo8EJ": {},
                "ParseData-i5f3r": {},
                "Prompt-HvopQ": {},
                "ChatOutput-mXK87": {},
                "SplitText-Sy3qT": {},
                "File-uyRG3": {},
                "AstraVectorStoreComponent-WZDCY": {},
                "File-mw66q": {},
                "File-AkkQC": {},
                "File-He07V": {},
                "AstraVectorize-h9QGT": {},
                "AstraVectorize-vpUfx": {},
                "Maritalk-k38zD": {}
            };
    
            const response = await langflowClient.runFlow(
                flowIdOrName,
                langflowId,
                inputValue,
                inputType,
                outputType,
                tweaks,
                stream,
                (data) => console.log("Received:", data.chunk), // onUpdate
                (message) => console.log("Stream Closed:", message), // onClose
                (error) => console.log("Stream Error:", error) // onError
            );

            if (!stream && response && response.outputs) {
                const flowOutputs = response.outputs[0];
                const firstComponentOutputs = flowOutputs.outputs[0];
                const output = firstComponentOutputs.outputs.message;
                
                if (output && output.text) {
                    setMessages([...messages, {
                        message: output.text, // Adiciona o texto da mensagem de resposta
                        direction: "incoming",
                    }]);
                } else {
                    console.error("Mensagem de saída não encontrada.");
                }
            }
            
        }
        catch (error) {
            //console.error('Main Error', error.message);
            setMessages(
                [...userMessage, {
                    message: error.message, //Coloca onde estiver o conteúdo
                    direction: "incoming",
                }]
            )
        }
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