import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { DetalleComponent } from './components/detalle/detalle.component';
import { TableDetalleComponent } from './components/table-detalle/table-detalle.component';
import { HttpClientModule} from "@angular/common/http";
import { FormatfechaPipe } from './pipes/formatfecha.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { ServidorComponent } from './components/servidor/servidor.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    DetalleComponent,
    TableDetalleComponent,
    FormatfechaPipe,
    FooterComponent,
    ServidorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
