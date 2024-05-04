import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = { email: '', password: '' };
  mensaje: string = '';

  constructor(private usuarioService: AuthService, private router: Router) { }

  iniciarSesion(): void {
    this.usuarioService.obtenerUsuarioPorEmail(this.usuario.email)
      .subscribe((usuarios: Usuario[]) => {
        if (usuarios && usuarios.length > 0 && usuarios[0].password === this.usuario.password) {
          this.mensaje = 'Inicio de sesión exitoso';
          this.router.navigate(['libros']);
        } else {
          this.mensaje = 'Credenciales incorrectas';
        }
      });
  }
}
