#!/bin/bash
docker run -it --rm -p 8000:3000 -v ~/work/angular/ng-app/server:/go/src/go-restful -w /go/src/go-restful notes
