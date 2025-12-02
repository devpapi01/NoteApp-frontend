import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NoteService } from './note-service';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private noteService: NoteService) {}

  getAllDistinctTags(): Observable<string[]> {
    const allpage = 1000;

    return this.noteService.getNotes(undefined, undefined, undefined, 0, allpage).pipe(
      map((response) => {
        const allTags = new Set<string>();

        response.content.forEach((note: Note) => {
          if (note.tagslist && Array.isArray(note.tagslist)) {
            note.tagslist.forEach((tag) => {
              if (tag && typeof tag === 'string') {
                allTags.add(tag.trim());
              }
            });
          }
        });

        return Array.from(allTags).sort();
      })
    );
  }
}
