import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Note } from './note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {

  @Input()
  note: Note;
  @Output()
  change: EventEmitter<Note> = new EventEmitter(true);

  toggleDone(): void {
    this.note.Done = !this.note.Done;
    this.change.emit(this.note);
  }

  toggleDiscarded(): void {
    this.note.Deleted = !this.note.Deleted;
    this.change.emit(this.note);
  }

  toggleStarred(): void {
    this.note.Starred = !this.note.Starred;
    this.change.emit(this.note);
  }

  updateNote(): void {
    this.change.emit(this.note);
  }
}
