FROM node:latest as node
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . . 
RUN npm run build

# Expose port 4200 for the Angular app to run on
EXPOSE 4200

CMD [ "npm", "start" ]