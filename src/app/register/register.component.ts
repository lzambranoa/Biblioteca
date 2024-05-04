import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario: Usuario = { email: '', password: '' };
  mensaje: string = '';

  constructor(private usuarioService: AuthService, private router: Router) { }

  registrarUsuario(): void {
    this.usuarioService.obtenerUsuarioPorEmail(this.usuario.email)
      .subscribe((usuarios: Usuario[]) => {
        if (usuarios && usuarios.length > 0) {
          this.mensaje = 'El correo electrónico ya está registrado';
        } else {
          this.usuarioService.registrarUsuario(this.usuario)
            .subscribe(() => {
              this.mensaje = 'Registro exitoso';
              this.router.navigate(['/login']);
            });
        }
      });
  }

}
