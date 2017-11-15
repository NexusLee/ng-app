import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-wrapper',
  templateUrl: './note-wrapper.component.html',
  styleUrls: ['./note-wrapper.component.css']
})
export class NoteWrapperComponent implements OnInit, OnDestroy {

  public title = 'Notes app';
  public filter: string;
  private sub: any;
  private array = [ 1 ];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    setTimeout(_ => {
      this.array = [ 1, 2, 3, 4 ];
    }, 500)
    this.sub = this.route.params.subscribe(params => {
      this.filter = params['status'] === undefined ? 'remaining' : params['status'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
