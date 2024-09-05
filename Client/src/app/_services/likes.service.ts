import { PaginatedResult } from './../_models/pagination';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  likesUrl = environment.apiUrl+"likes";
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  toggleLike(targetId: number) {
    return this.http.post(`${this.likesUrl}/${targetId}`, {});
  }
  
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return this.http.get<Member[]>(`${this.likesUrl}`, 
      {observe: 'response', params}).subscribe({
        next: response => setPaginatedResponse(response, this.paginatedResult)
      })
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.likesUrl}/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }

}
