package main

import (
  "github.com/emicklei/go-restful"
  "github.com/NexusLee/ng-app/server/api"
  "log"
  "net/http"
)

func main(){
  // install a global (=DefaultContainer) filter (processed before any webservice in the DefaultContainer)
  restful.Filter(globalLogging)

  restful.Add(api.NewUserService())
//  restful.Add(api.NewNoteService())

  restful.Add(&api.NoteResource{}.NewNoteService())
//  restful.Add(api.NoteResource{}.NewNoteService())
  log.Print("start listening on localhost:3000")
  log.Fatal(http.ListenAndServe(":3000", nil))
}

// Global Filter
func globalLogging(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
  log.Printf("[global-filter (logger)] %s,%s\n", req.Request.Method, req.Request.URL)
  chain.ProcessFilter(req, resp)
}
