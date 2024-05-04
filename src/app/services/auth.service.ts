import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}`, usuario);
  }

  obtenerUsuarioPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}?email=${email}`);
  }
}
