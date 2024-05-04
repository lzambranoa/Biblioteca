import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private baseUrl = 'http://localhost:3000/libros';

  constructor(private http: HttpClient) { }

  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl);
  }

  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.baseUrl, libro);
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    const url = `${this.baseUrl}/${libro.id}`;
    return this.http.put<Libro>(url, libro);
  }

  eliminarLibro(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
