FROM node:alpine
WORKDIR /home/node/project
COPY --chown $user:$user package.json ./
COPY --chown $user:$user package-lock.json ./
COPY --chown $user:$user ./ ./
RUN npm config set unsafe-perm true
RUN npm i
CMD ["npm", "run", "start"]