FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm config set unsafe-perm true
RUN npm i
CMD ["npm", "run", "start"]