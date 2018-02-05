//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Mensuration } from '../../app/domaines/mensuration';

export class Mesure {

  private id : number;
  private date : string; //2017-02-28
  private mesure : number;
  private idUti : number;
  private mensuration : Mensuration;

  constructor() {}
  
  //getters
  public getId () : number {return this.id;}
  public getDate () : string {return this.date;}
  public getMesure () : number {return this.mesure;}
  public getIdUti () : number {return this.idUti;}
  public getMensuration () : Mensuration {return this.mensuration;}

  //setters
  public setId (id:number) {this.id = id;}
  public setDate (date:string) {this.date = date;}
  public setMesure (mesure:number) {this.mesure = mesure;}
  public setIdUti (idUti:number) {this.idUti = idUti;}
  public setMensuration (mensuration:Mensuration) {this.mensuration = mensuration;}

} // Mesure


