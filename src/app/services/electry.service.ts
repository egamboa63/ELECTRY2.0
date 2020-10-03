import { TmplAstBoundAttribute } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//MODELS
import { Demanda } from "../models/demanda";
import { Estado } from "../models/estado";
import { Planta } from "../models/planta";
import { Produccion } from "../models/produccion";
import { Valor } from "../models/valor";

@Injectable({
  providedIn: 'root'
})
export class ElectryService {
  demandaCollections:AngularFirestoreCollection;
  demandaL: Observable<Demanda[]>;
  estado: Observable<Estado[]>;
  planta: Observable<Planta[]>;
  produccion: Observable<Produccion[]>;
  valor: Observable<Valor[]>;

  constructor(public db: AngularFirestore) {
  }
  getEstados(){
    //CONSULTA COMPUESTA
    //https://gabicuesta.blogspot.com/2020/02/angular-como-hacer-consultas-firebase.html
    //this.produccion = this.db.collection('PRODUCCION',ref => ref.where("IDPLANTA","==",1).orderBy('FECHA').limitToLast(24)).valueChanges();
    this.estado = this.db.collection('ESTADO', ref => ref.orderBy('FECHA')).valueChanges();
    return this.estado;
  }
  getPlantas(){
    this.planta = this.db.collection('PLANTA', ref => ref.orderBy('ID')).valueChanges();
    return this.planta;
  }
  getProduccion(){
    //CONSULTA COMPUESTA
    //https://gabicuesta.blogspot.com/2020/02/angular-como-hacer-consultas-firebase.html
    //this.produccion = this.db.collection('PRODUCCION',ref => ref.where("IDPLANTA","==",1).orderBy('FECHA').limitToLast(24)).valueChanges();
    this.produccion = this.db.collection('PRODUCCION',ref => ref.orderBy('FECHA').limitToLast(24)).valueChanges();
    return this.produccion;
  }
  getValor(){
    this.valor = this.db.collection('VALOR', ref => ref.orderBy('FECHA').limitToLast(24)).valueChanges();
    return this.valor;
  }

  //SE PUEDE AGREGAR UNA VARIABLE PARA QUE TRAIGA SEGUN LO QUE NECESITO
  getDemandaUltimosN(){
    //this.demanda = this.db.collection('DEMANDA', ref => ref.orderBy('FECHA').limitToLast(10)).valueChanges();  
    this.demandaCollections = this.db.collection('DEMANDA', ref => ref.orderBy('FECHA').limitToLast(10));
    this.demandaL = this.demandaCollections.snapshotChanges().pipe(map(actions =>
    {
      return actions.map(a=>{
        const data = a.payload.doc.data() as Demanda;
        data.id = a.payload.doc.id;
        return data;
      });
    }));  
    return this.demandaL;
  }
}
