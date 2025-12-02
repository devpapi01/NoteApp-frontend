import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-list',
  imports: [MatListModule, CommonModule],
  templateUrl: './public-list.html',
  styleUrl: './public-list.css',
})
export class PublicList implements OnInit {
  listToken: String[] = [];

  constructor(private noteService: NoteService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.noteService.getAllpublicLink().subscribe((data) => {
      (this.listToken = data), this.cdr.detectChanges();
    });
  }
}
