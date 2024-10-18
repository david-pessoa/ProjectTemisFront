# Integrantes
* Cesar Hideki Imai
* João Victor Dallapé Madeira
* David Varão Lima Bentes Pessoa

Link para o site da aplicação: https://main.d21ve57798n4rc.amplifyapp.com/  
Link para o site estático: http://samsai.com.s3-website-us-east-1.amazonaws.com/

# Documentação

### Pré requisitos
* npm
* node
* Jest (para executar testes)

## Como rodar a aplicação localmente
### Passo 1)
Execute o comando `npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event @chatscope/chat-ui-kit-react -D` para instalar as dependências e bibliotecas necessárias

### Passo 2)
Execute o comando `npm test` para verificar se os testes unitários declarados em `Login.test.js` estão sendo executados corretamente

### Passo 3)
Execute o comando `npm start` para inciar a aplicação no `localhost:3000`

## Arquivos
### index.js
Os arquivos que serão de fato úteis estão localizados na pasta `src`. O arquivo `index.js` será onde colocaremos todo o "HTML" da página dentro do `render()`. Neste caso, como estamos, por enquanto, trabalhando somente com a tela principal do chat, chamei o componente `<MainScreen/>` do arquivo `MainScreen.js`. 

### MainsScreen.js
Dentro deste componente é onde são colocados o ícone do menu hambúrguer (à direita), o título "SamsAI" e a foto de perfil (à esquerda) no topo da tela. Além disso são aplicadas estilizações no interior do componente para estilizar seu código "HTML" e é chamado o componente `<Chat/>` do arquivo `Chat.js` que contém o componente relativo a conversa com as mensagens do usuário e do bot (Também criei o componente `<BemVindo/>`, mas)
