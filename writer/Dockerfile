FROM node:20

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "index.js"]

# TAG=3; docker build --platform linux/amd64 -t mluukkai/log_output_writer:$TAG . ; docker push mluukkai/log_output_writer:$TAG 

# k logs log-output-dep-5dfd5cdcd-4btdl -c log-output-writer