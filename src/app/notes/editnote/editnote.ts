import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, PublicLink } from '../../models/note.model'; // Assurez-vous que Note est correct
import { NoteService } from '../../services/note-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select'; // Ajouté pour la visibilité
import { marked } from 'marked';
import { TagService } from '../../services/tag-service';

@Component({
  selector: 'app-editnote',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  templateUrl: './editnote.html',
  styleUrl: './editnote.css',
})
export class Editnote implements OnInit {
  noteId: string | null = null;
  note: any = {
    title: '',
    contentMd: '',
    visibility: 'PRIVATE',
    tagslist: [],
  };

  shareEmail = '';
  publicLink: PublicLink | null = null;

  error = '';
  newTagInput: string = '';
  availableTags: string[] = [];

  constructor(
    private noteService: NoteService,
    private tagservice: TagService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] !== 'new') {
        this.noteId = params['id'];
        this.loadNote();
      }
    });
    this.loadTags();
  }

  loadNote(): void {
    if (!this.noteId) return;
    this.noteService.getNote(this.noteId).subscribe({
      next: (note: Note) => {
        this.note = note;
        tagslist: note.tagslist || [];
        this.note.tagslist.forEach((tagLabel: string) => {
          if (tagLabel && !this.availableTags.includes(tagLabel)) {
            this.availableTags.push(tagLabel);
          }
        });
        this.availableTags.sort();
      },
    });
  }

  loadTags(): void {
    this.tagservice.getAllDistinctTags().subscribe({
      next: (tags) => {
        this.availableTags = tags;
      },
    });
  }

  saveNote(): void {
    if (!this.note.title.trim()) {
      alert('Le titre est requis.');
      return;
    }

    const noteRequest = {
      title: this.note.title,
      contentMd: this.note.contentMd,
      visibility: this.note.visibility,
      tagslist: this.note.tagslist || [],
    };

    const saveOperation = this.noteId
      ? this.noteService.updateNote(this.noteId, noteRequest)
      : this.noteService.createNote(noteRequest);

    saveOperation.subscribe({
      next: (note: Note) => {
        alert('Note enregistrée avec succès.');
        if (!this.noteId) {
          this.router.navigate(['/notes', note.id]);
        }
      },
      error: (err) => {
        console.error("Échec de l'enregistrement", err.error.message);
        alert("Échec de l'enregistrement.");
        this.error = err.error.message;
        console.log(this.error);
      },
    });
  }

  deleteNote(): void {
    if (!this.noteId) return;

    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cette note ?');
    if (confirmed) {
      this.noteService.deleteNote(this.noteId).subscribe({
        next: () => {
          alert('Note supprimée.');
          this.router.navigate(['/notes']);
        },
        error: (err) => {
          console.error('Échec de la suppression', err.error.message);
          alert('Échec de la suppression.');
          this.error = err.error.message;
        },
      });
    }
  }

  async markdownPreview(): Promise<string> {
    return await marked.parse(this.note.contentMd || '');
  }

  shareWithUser(): void {
    if (!this.noteId || !this.shareEmail) return;

    this.error = '';
    console.log(this.shareEmail);

    this.noteService.shareWithUser(this.noteId, this.shareEmail).subscribe({
      next: () => {
        alert('Note partagée avec succès');
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Echec de partage';
      },
    });
  }

  generatePublicLink(): void {
    if (!this.noteId) return;

    this.noteService.createPublicLink(this.noteId).subscribe({
      next: (link: PublicLink) => {
        this.publicLink = link;
        alert(`Le lien public est : ${this.getFullPublicUrl()}`);
        this.router.navigate(['/notes']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      },
    });
  }

  getFullPublicUrl(): string {
    return this.publicLink ? `http://localhost:4200${this.publicLink.publicUrl}` : '';
  }

  goBack(): void {
    this.router.navigate(['/notes']);
  }

  addTagFromInput(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const tagLabel = this.newTagInput.trim();
    if (!tagLabel) return;

    if (!this.note.tagslist.includes(tagLabel)) {
      this.note.tagslist.push(tagLabel);
      this.note.tagslist.sort();
    }

    if (!this.availableTags.includes(tagLabel)) {
      this.availableTags.push(tagLabel);
      this.availableTags.sort();
    }

    this.newTagInput = '';
  }
}
