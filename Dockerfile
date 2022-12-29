# syntax=docker/dockerfile:1
FROM node:18-slim
WORKDIR /application
COPY package.json ./application
RUN npm install -g
COPY . ./application
CMD ["npm", "start"]