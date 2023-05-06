FROM node:18-alpine

WORKDIR /app

COPY api/package*.json ./api/

RUN cd api && npm install

COPY api ./api

COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install

COPY frontend/src ./frontend/src

COPY api/public ./frontend/public

WORKDIR /app/frontend

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
