import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Note, PagedResponse } from '../../models/note.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { NoteService } from '../../services/note-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TagService } from '../../services/tag-service';

@Component({
  selector: 'app-listenotes',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './listenotes.html',
  styleUrl: './listenotes.css',
})
export class Listenotes implements OnInit {
  notes: Note[] = [];
  loading = false;
  searchQuery = '';
  selectedVisibility = '';
  currentPage = 0;
  totalPages = 0;
  userEmail = '';
  selectedTag: string = '';
  availableTags: string[] = [];

  constructor(
    private noteService: NoteService,
    private authService: AuthService,
    private tagservice: TagService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.selectedVisibility = '';
    this.loadTags();
    this.userEmail = this.authService.getCurrentUser()?.email || '';
  }

  loadTags(): void {
    this.tagservice.getAllDistinctTags().subscribe({
      next: (tags) => {
        this.availableTags = tags;
      },
    });
  }
  loadNotes(): void {
    this.noteService
      .getNotes(
        this.searchQuery || undefined,
        this.selectedTag || undefined,
        this.selectedVisibility || undefined,
        this.currentPage
      )
      .subscribe({
        next: (response: PagedResponse<Note>) => {
          this.notes = response.content.map((note) => ({
            ...note,
            tagslist: note.tagslist || [],
          }));

          this.totalPages = response.page.totalPages;

        },
      });
  }

  createNote(): void {
    this.router.navigate(['/notes/new']);
  }

  openNote(id: string): void {
    this.router.navigate(['/notes', id]);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadNotes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadNotes();
    }
  }
  truncateContent(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  }
}
