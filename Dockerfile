FROM node:8-alpine as builder
WORKDIR /app
COPY . /app
RUN npm install -g bower gulp
RUN npm install
RUN gulp build

FROM nginx:alpine
ADD nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app /usr/share/nginx/html
