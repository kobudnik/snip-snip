FROM node
ARG PG_URI
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY dist ./dist
COPY server ./server
ENV PG_URI=${PG_URI}
EXPOSE 3000
CMD ["npm", "start"]

