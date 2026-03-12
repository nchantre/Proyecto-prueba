import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com';


  private postsCache = new Map<number, Post[]>();
  private allPostsCache: Post[] | null = null;


  getPosts(page = 1, limit = 10): Observable<Post[]> {
    if (this.allPostsCache) {
      const start = (page - 1) * limit;
      return new Observable((sub) => {
        sub.next(this.allPostsCache!.slice(start, start + limit));
        sub.complete();
      });
    }

    const cached = this.postsCache.get(page);
    if (cached) {
      this.prefetch(page + 1, limit);
      return new Observable((sub) => {
        sub.next(cached);
        sub.complete();
      });
    }

    const url = `${this.apiUrl}/posts?_limit=${limit}&_page=${page}`;
    const request$ = this.http.get<Post[]>(url);
    request$.subscribe((data) => {
      this.postsCache.set(page, data);
      this.prefetch(page + 1, limit);
    });
    return request$;
  }

  getAllPosts(): Observable<Post[]> {
    if (this.allPostsCache) {
      return new Observable((sub) => {
        sub.next(this.allPostsCache!);
        sub.complete();
      });
    }
    const url = `${this.apiUrl}/posts`; // returns 100 posts by default
    return new Observable((sub) => {
      this.http.get<Post[]>(url).subscribe({
        next: (data) => {
          this.allPostsCache = data;
          // also fill page cache for convenience
          const perPage = 10;
          for (let i = 0; i < data.length; i += perPage) {
            const p = i / perPage + 1;
            this.postsCache.set(p, data.slice(i, i + perPage));
          }
          sub.next(data);
          sub.complete();
        },
        error: (err) => sub.error(err),
      });
    });
  }

  private prefetch(page: number, limit: number) {
    if (this.postsCache.has(page) || this.allPostsCache) {
      return;
    }
    const url = `${this.apiUrl}/posts?_limit=${limit}&_page=${page}`;
    this.http.get<Post[]>(url).subscribe((data) => {
      this.postsCache.set(page, data);
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
