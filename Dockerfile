FROM node:18

WORKDIR /

COPY . .

RUN npm install

EXPOSE 3001

CMD npm run start