FROM node:23-alpine

WORKDIR /ProjectTemisFront

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80:3000

CMD [ "npm", "start" ]