FROM node:20

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]

# TAG=8; docker build --platform linux/amd64  -t mluukkai/log_output_reader:$TAG . ; docker push mluukkai/log_output_reader:$TAG 