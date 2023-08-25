
FROM node:16-alpine
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/


RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
RUN npm run build


EXPOSE 3000


# start app
CMD ["npm", "start"]

#docker build -t reddel/reddel-front .
#docker run -it -p 3000:3000 -d react-app