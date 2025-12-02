import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note-service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-shared-list',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './shared-list.html',
  styleUrl: './shared-list.css',
})
export class SharedList implements OnInit {
  liste: Note[] = [];
  error: string | null = null;

  constructor(private noteService: NoteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSharedNotes();
  }

  loadSharedNotes(): void {
    this.noteService.getNotesSharedWithMe().subscribe({
      next: (data) => {
        this.liste = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des notes partagées';

        console.error(err);
      },
    });
  }
}
