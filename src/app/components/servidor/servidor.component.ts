import { Component, OnInit } from '@angular/core';
import {ServidorService} from "../../services/servidor.service";
import {Servidor} from "../../modelos/Servidor";
import {SaveServidor} from "../../modelos/SaveServidor";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {

  servidores:Array<Servidor> = [];
  servidor:SaveServidor = {
    nombre:"",
    direccion_ip_publica:"",
    direccion_ip_privada:"",
    puerto:"",
    usuario:"",
    contrasenia:"",
    alias:"",
    uso:"",
    dominio:"",
    tipo_protocolo:0
  }
  servidorUpdate:SaveServidor = {
    nombre:"",
    direccion_ip_publica:"",
    direccion_ip_privada:"",
    puerto:"",
    usuario:"",
    contrasenia:"",
    alias:"",
    uso:"",
    dominio:"",
    tipo_protocolo:0
  }
  servidorModal:any ={
    t_id:0,
    nombre:"",
    direccion_ip_publica:"",
    direccion_ip_privada:"",
    puerto:"",
    usuario:"",
    contrasenia:"",
    alias:"",
    uso:"",
    dominio:"",
    tipo_protocolo:0

  }

  constructor(private _servidorService : ServidorService) { }

  ngOnInit(): void {
    this.cargarServidores();
  }

  cargarServidores(){
    this._servidorService.listaServidores.subscribe({
      next: value => {
        this.servidores = value;
      },error: err =>{
        console.log((err))
      },
      complete:() => {}
    })
  }

  guardarServidor(){
    this._servidorService.guardarServidor(this.servidor).subscribe({
      next:value => {
        console.log(value)
      },error:err => {
        console.log((err))
      },complete: () => {
        this.cargarServidores();
        this.servidor = {
          nombre:"",
          direccion_ip_publica:"",
          direccion_ip_privada:"",
          puerto:"",
          usuario:"",
          contrasenia:"",
          alias:"",
          uso:"",
          dominio:"",
          tipo_protocolo:0
        }
      }
    });
  }


  mostrarAlertEliminar(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text: "no podra reviertir el cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarServidor(id);
        Swal.fire(
          'Eliminado!',
          'El servidor ha sido eliminado.',
          'success'
        )
      }
    })
  }

  mostrarUpdateServidor(id:number){
    this._servidorService.obtenerServidor(id).subscribe({
      next:value => {
        this.servidorModal = value;
      }
    })
  }

  updateServidor(servidorModal: any){
    this.servidorUpdate.nombre = servidorModal.nombre;
    this.servidorUpdate.direccion_ip_publica = servidorModal.direccion_ip_publica;
    this.servidorUpdate.direccion_ip_privada = servidorModal.direccion_ip_privada;
    this.servidorUpdate.puerto = servidorModal.puerto;

    console.log(this.servidorModal)
    this._servidorService.updateServidor(this.servidorUpdate, servidorModal.t_id).subscribe({
      next:value => {

      },
      error: err => {
        console.log(err)
      },
      complete:() => {
        this.cargarServidores();
      }
    });
    //console.log(this.servidorUpdate, servidorModal.id)
  }

  eliminarServidor(id:number){
    this._servidorService.eliminarServidor(id).subscribe({
      next:value => {

      },
      error:err => {
        console.log(err)
      },
      complete:() => {
        this.cargarServidores();
      }
    });
  }

}
