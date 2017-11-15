import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeroListComponent }     from './heroes/hero-list.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteWrapperComponent } from './notes/note-wrapper/note-wrapper.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

import { NoteService } from './notes/notes-service/note.service';
import { EmitterService } from './notes/emitter-service/emitter.service';

import { AppRoutingModule }     from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeroListComponent,
    NoteComponent,
    NoteWrapperComponent,
    NotesListComponent,
    AddNoteComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    //NgZorroAntdModule
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [NoteService, EmitterService]
})
export class AppModule { }
