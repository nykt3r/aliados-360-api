FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY start.sh .

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]