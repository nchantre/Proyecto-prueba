import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../../layout/navbar/navbar';
import { Sidebar } from '../../../../layout/sidebar/sidebar';

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './pedidos-list.html',
  styleUrl: './pedidos-list.css',
})
export class PedidosList {
  pedidos = [
    { id: 1, cliente: 'Juan Pérez', producto: 'Producto A', cantidad: 10, total: 1000 },
    { id: 2, cliente: 'María García', producto: 'Producto B', cantidad: 5, total: 500 },
    { id: 3, cliente: 'Carlos López', producto: 'Producto C', cantidad: 8, total: 800 },
  ];
}
