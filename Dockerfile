FROM node
ARG PG_URI
ARG REDIS_CLIENT
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY dist ./dist
COPY server ./server
ENV PG_URI=${PG_URI}
ENV REDIS_CLIENT=${REDIS_CLIENT}
EXPOSE 3000
CMD ["npm", "start"]