import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto, ProductoService } from '../../services/producto.service';
import { Sede, SedeService } from '../../services/sede.service';
import { InventarioService, InventarioItem } from '../../services/inventario.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  busquedaForm: FormGroup;
  resultados: any[] = [];
  sedes: Sede[] = []
  productos: Producto[] = []

  constructor(private fb: FormBuilder, private inventarioService: InventarioService, private productoService: ProductoService, private sedeService: SedeService) {
    this.busquedaForm = this.fb.group({
      nombre: [''],
      categoria: [''],
      sede: [''],
      cantidad: [null],
      precio: [null], // Agregar campo de precio
      marca: [''] // Agregar campo de marca
    });
  }

  ngOnInit(): void {
    this.sedes = this.sedeService.getSedes()
    this.productos = this.productoService.getProductos();
  }

  buscarProductos() {
    const criterios = this.busquedaForm.value;
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    this.resultados = productos.filter((producto: any) => {
      return (!criterios.nombre || producto.nombre.includes(criterios.nombre)) &&
             (!criterios.categoria || producto.categoria === criterios.categoria) &&
             (!criterios.sede || producto.sede === criterios.sede) &&
             (!criterios.cantidad || producto.cantidad >= criterios.cantidad) &&
             (!criterios.precio || producto.precio <= criterios.precio) && // Filtrar por precio
             (!criterios.marca || producto.marca === criterios.marca); // Filtrar por marca
    });
  }
}