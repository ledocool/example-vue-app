FROM node:18-alpine as install
WORKDIR /app

COPY ./frontend/package*.json ./
RUN ls -la
RUN npm install

FROM install as run
COPY ./frontend .
RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "production"]