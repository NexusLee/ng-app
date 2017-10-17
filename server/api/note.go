package api

import (
  "github.com/emicklei/go-restful"
  "log"
  "net/http"

)

type Note struct {
  ID string
  Title string
  Description string
  Starred bool
  Done  bool
  Deleted bool
}

type NoteList struct {
  Notes []Note
}

// NoteResource is the REST layer to the Note domain
type NoteResource struct {
  // normally one would use DAO (data access object)
  notes map[string]Note
}


func NewNoteService() *restful.WebService {
  ws := new(restful.WebService)
  ws.
  Path("/api/notes").
  Consumes(restful.MIME_XML, restful.MIME_JSON).
  Produces(restful.MIME_JSON, restful.MIME_XML)

  // install a webservice filter (processed before any route)
  ws.Filter(webserviceLogging).Filter(measureTime)

  //tags := []string{"notes"}

  // install a counter filter
  ws.Route(ws.GET("").Filter(NewCountFilter().routeCounter).To(getAllNotes))

  // install 2 chained route filters (processed before calling findUser)
  ws.Route(ws.GET("/{note-id}").Filter(routeLogging).Filter(NewCountFilter().routeCounter).To(findNote))

  ws.Route(ws.PUT("/{note-id}").To(updateNote).
  // docs
  Doc("update a note").
  Param(ws.PathParameter("note-id", "identifier of the note").DataType("string")).
  //Metadata(restfulspec.KeyOpenAPITags, tags).
  Reads(Note{})) // from the request


  return ws
}

// Global Filter
//func globalLogging(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
//  log.Printf("[global-filter (logger)] %s,%s\n", req.Request.Method, req.Request.URL)
//  chain.ProcessFilter(req, resp)
//}

// WebService Filter
//func webserviceLogging(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
//  log.Printf("[webservice-filter (logger)] %s,%s\n", req.Request.Method, req.Request.URL)
//  chain.ProcessFilter(req, resp)
//}

// WebService (post-process) Filter (as a struct that defines a FilterFunction)
//func measureTime(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
//  now := time.Now()
//  chain.ProcessFilter(req, resp)
//  log.Printf("[webservice-filter (timer)] %v\n", time.Now().Sub(now))
//}

// Route Filter (defines FilterFunction)
//func routeLogging(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
//  log.Printf("[route-filter (logger)] %s,%s\n", req.Request.Method, req.Request.URL)
//  chain.ProcessFilter(req, resp)
//}

// Route Filter (as a struct that defines a FilterFunction)
// CountFilter implements a FilterFunction for counting requests.
//type CountFilter struct {
//  count   int
//  counter chan int // for go-routine safe count increments
//}

// NewCountFilter creates and initializes a new CountFilter.
//func NewCountFilter() *CountFilter {
//  c := new(CountFilter)
//  c.counter = make(chan int)
//  go func() {
//    for {
//      c.count += <-c.counter
//    }
//  }()
//  return c
//}

// routeCounter increments the count of the filter (through a channel)
//func (c *CountFilter) routeCounter(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
//  c.counter <- 1
//  log.Printf("[route-filter (counter)] count:%d", c.count)
//  chain.ProcessFilter(req, resp)
//}

// GET http://localhost:8000/notes
//
func (n *NoteResource) getAllNotes(request *restful.Request, response *restful.Response) {
  log.Print("getAllNotes")
  response.WriteEntity(NoteList{[]Note{{ID: "1", Title: "Task of the day"}, {ID: "2", Title: "Pi", Description: "Buy a milk."}}})
}

// GET http://localhost:8000/notes/42
//
func (n *NoteResource) findNote(request *restful.Request, response *restful.Response) {
  log.Print("findNote")
  response.WriteEntity(Note{ID: "1", Title: "Task of the day"})
}

// PUT http://localhost:8000/notes/1
// <Note><ID>1</ID><Title>Task of the day</Title></Note>
//
func (n *NoteResource) updateNote(request *restful.Request, response *restful.Response) {
  note := new(Note)
  err := request.ReadEntity(&note)
  if err == nil {
    n.notes[note.ID] = *note
    response.WriteEntity(note)
  } else {
    response.WriteError(http.StatusInternalServerError, err)
  }
}
