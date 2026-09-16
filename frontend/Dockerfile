FROM node:25

WORKDIR /code/
COPY package*.json .
RUN npm install
COPY . .
# COPY ./src ./src
# COPY ./public ./public
# COPY ./index.html ./index.html
# COPY ./vite.config.ts ./vite.config.ts
# COPY ./tsconfig.json ./tsconfig.json
# COPY ./tsconfig.app.json ./tsconfig.app.json
# COPY ./tsconfig.node.json ./tsconfig.node.json

EXPOSE 3000

CMD ["npm", "run", "dev"]
