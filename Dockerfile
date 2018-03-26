FROM node:8.9.4
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/logs
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install --verbose
RUN npm ls
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]