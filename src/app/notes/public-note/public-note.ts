import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NoteService } from '../../services/note-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-note',

  imports: [CommonModule, RouterOutlet],
  templateUrl: './public-note.html',
  styleUrl: './public-note.css',
})
export class PublicNote implements OnInit {
  note: Note | null = null;

  error = '';
  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.loadPublicNote(token);
      } else {
        this.error = 'erreur';
      }
    });
  }

  loadPublicNote(token: string): void {
    this.error = '';

    this.noteService.getNoteByPublicToken(token).subscribe({
      next: (note) => {
        this.note = note;


      },
      error: (err) => {
        console.error('Erreur lors du chargement de la note publique', err);
        this.error = err.error?.message;

      },
    });
  }
}
