FROM golang:1.15-alpine
MAINTAINER JuseongPark juseongkr@gmail.com

RUN mkdir -p /docker_app

WORKDIR /docker_app

ADD ./ /docker_app

ENV GIN_MODE=release

RUN go get ./src

CMD go run src/main.go
