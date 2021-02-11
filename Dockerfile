FROM node:15.7.0

WORKDIR /fec/relatedInfo

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server/index.js"]