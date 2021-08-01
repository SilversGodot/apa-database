import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL: string;
  constructor(private http : HttpClient) {
    this.ROOT_URL = 'http://ec2-13-58-91-242.us-east-2.compute.amazonaws.com/api';
    // 'http://ec2-13-58-91-242.us-east-2.compute.amazonaws.com/api'
    // 'http://localhost:3000'
  }

  get<type>(uri: string) {
    return this.http.get<type>(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
