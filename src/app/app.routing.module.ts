import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

import { NoteWrapperComponent } from './notes/note-wrapper/note-wrapper.component';
//import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { HeroListComponent } from './heroes/hero-list.component';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

//const routes: Routes = [
//  { path: '', redirectTo: '/app', pathMatch: 'full' },
//
//  { path: 'about', component: AboutComponent }
//];

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app',  component: AppComponent },
  { path:'about', component: AboutComponent},
  { path: 'heroes', component: HeroListComponent },
  {
    path: 'notes',
    component: NoteWrapperComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
