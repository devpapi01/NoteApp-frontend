import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponse, Note, NoteRequest, PublicLink } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getNotes(
    query?: string,
    tag?: string,
    visibility?: string,
    page: number = 0,
    size: number = 10
  ): Observable<PagedResponse<Note>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (query) params = params.set('query', query);
    if (tag) params = params.set('tag', tag);
    if (visibility) params = params.set('visibility', visibility);

    return this.http.get<PagedResponse<Note>>(`${this.API_URL}/notes/all`, { params });
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/notes/${id}`);
  }

  createNote(request: NoteRequest): Observable<Note> {
    return this.http.post<Note>(`${this.API_URL}/notes/create`, request);
  }

  updateNote(id: string, request: NoteRequest): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/notes/${id}`, request);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/notes/${id}`);
  }

  shareWithUser(noteId: string, email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/notes/${noteId}/share/user`, { email });
  }

  createPublicLink(noteId: string): Observable<PublicLink> {
    return this.http.post<PublicLink>(`${this.API_URL}/notes/${noteId}/share/public`, {});
  }

  getNoteByPublicToken(token: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/p/${token}`);
  }

  getAllpublicLink(): Observable<String[]> {
    return this.http.get<String[]>(`${this.API_URL}/notes/allpl`);
  }

  getNotesSharedWithMe(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.API_URL}/notes/sharedwm`);
  }
}
