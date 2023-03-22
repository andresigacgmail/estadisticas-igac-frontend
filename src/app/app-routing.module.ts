import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import {ServidorComponent} from "./components/servidor/servidor.component";

const routes: Routes = [
  { path: '', component:  TableComponent},
  { path: 'detalle/:id', component:  DetalleComponent},
  { path: 'servidor', component: ServidorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
