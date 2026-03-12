import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../../layout/navbar/navbar';
import { Sidebar } from '../../../../layout/sidebar/sidebar';

@Component({
  selector: 'app-pagos-list',
  standalone: true,
  imports: [CommonModule, Navbar, Sidebar],
  templateUrl: './pagos-list.html',
  styleUrl: './pagos-list.css',
})
export class PagosList {
  pagos = [
    { id: 1, concepto: 'Pago Factura', monto: 5000, fecha: '2024-03-01', estado: 'Completado' },
    { id: 2, concepto: 'Pago de servicios', monto: 3000, fecha: '2024-03-02', estado: 'Pendiente' },
    { id: 3, concepto: 'Pago de suministros', monto: 2000, fecha: '2024-03-03', estado: 'Completado' },
  ];
}
