import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { DetalleComponent } from './components/detalle/detalle.component';

const routes: Routes = [
  { path: '', component:  TableComponent},
  { path: 'detalle/:id', component:  DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
