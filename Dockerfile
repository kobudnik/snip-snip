FROM node
ARG PG_URI
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PG_URI=${PG_URI}
EXPOSE 3000
CMD ["npm", "start"]

