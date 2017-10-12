FROM golang:1.8

WORKDIR dependencies/

Add https://github.com/NexusLee/ng-app/commits/master.atom dependencies/

RUN go get -v github.com/emicklei/go-restful
RUN go get -v github.com/NexusLee/ng-app/server

EXPOSE 3000

