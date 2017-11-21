import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note/note';
import { NoteService } from '../notes-service/note.service';

//import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent {
  isVisible = false;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.validateForm = this.fb.group({
      Title            : [ '', [ Validators.required ], [ this.titleAsyncValidator ] ],
      Description            : [ '', [ Validators.required ], [ this.titleAsyncValidator ] ]
    });
  }

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    this.isVisible = false;
  }

  handleCancel = (e) => {
    this.validateForm.reset();
    this.isVisible = false;
  }

  getFormControl = (name) => {
    return this.validateForm.controls[ name ];
  }

  titleAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  descriptionAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
  }

  submitForm = ($event: MouseEvent, data) => {
    //console.log(data)
    //console.log(this.validateForm.controls)

    //const note: Note = new Note(+111, data.Title, data.Description);
    //this.noteService.create(note).subscribe();

    //console.log(note)
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    const note: Note = new Note(+111, data.Title, data.Description);
    this.noteService
      .create(note)
      .subscribe(() => {
        //notes =>
        //this.retrieveNotes();
      });
  }

  createNote(id: HTMLInputElement, title: HTMLInputElement, description: HTMLInputElement): void {
    const note: Note = new Note(+id.value, title.value, description.value);
    this.noteService.create(note).subscribe();
    //EmitterService.get(this.addId).emit(note);
  }
}
