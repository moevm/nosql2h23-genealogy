FROM node:18

COPY . /Backend

WORKDIR /Backend

RUN npm i
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
CMD ["dockerize", "-wait", "tcp://db:7687", "-timeout", "60s", "npm", "run","serve"]
