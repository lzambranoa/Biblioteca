import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/libro.model';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-crud-libros',
  templateUrl: './crud-libros.component.html',
  styleUrls: ['./crud-libros.component.css']
})
export class CrudLibrosComponent implements OnInit {
  libros: Libro[] = [];
  nuevoLibro: Libro = { nombre: '', autor: '', publicacion: 0 };
  libroParaActualizar: Libro | null = null;

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.librosService.obtenerLibros().subscribe(libros => {
      this.libros = libros;
    });
  }

  crearLibro(): void {
    this.librosService.crearLibro(this.nuevoLibro).subscribe(() => {
      this.obtenerLibros();
      this.nuevoLibro = { nombre: '', autor: '', publicacion: 0 };
    });
  }

  actualizarLibro(libro: Libro): void {
    this.librosService.actualizarLibro(libro).subscribe(() => {
      this.obtenerLibros();
    });
  }

  habilitarFormularioActualizar(libro: Libro): void {
    this.libroParaActualizar = libro; // Establece el libro seleccionado para actualización
  }

  guardarCambios(libroActualizado: Libro): void {
    this.librosService.actualizarLibro(libroActualizado).subscribe(() => {
      this.obtenerLibros();
      this.libroParaActualizar = null; // Reinicia el estado después de guardar cambios
    });
  }

  cancelarActualizacion(): void {
    this.libroParaActualizar = null; // Reinicia el estado al cancelar la actualización
  }

  eliminarLibro(id: number | undefined): void {
    if (id !== undefined) {
      this.librosService.eliminarLibro(id).subscribe(() => {
        this.obtenerLibros();
      });
    } else {
      console.error('ID del libro es undefined');
    }
  }
  
}
