FROM node:20

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]

# TAG=6; docker build  --platform linux/amd64 -t mluukkai/pingpong:$TAG .; docker push mluukkai/pingpong:$TAG
