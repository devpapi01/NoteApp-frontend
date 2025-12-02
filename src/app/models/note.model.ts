export interface Note {
  id: string;
  ownerId: string;
  title: string;
  contentMd: string;
  visibility: 'PRIVATE' | 'SHARED' | 'PUBLIC';
  createdAt: string;
  updatedAt: string;
  tagslist: string[];
}

export interface NoteRequest {
  title: string;
  contentMd: string;
  visibility?: 'PRIVATE' | 'SHARED' | 'PUBLIC';
  tagslist?: string[];
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PagedResponse<T> {
  content: T[];
  page: PageInfo;
}

export interface PublicLink {
  id: string;
  noteId: string;
  urlToken: string;
  publicUrl: string;
  expiresAt: string | null;
  createdAt: string;
}
