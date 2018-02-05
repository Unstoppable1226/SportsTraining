//package AjouterMesure

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';

//ionic-angular
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//providers
import { MesureDAO } from '../../app/providers/mesureDAO';
import { MensurationDAO } from '../../app/providers/mensurationDAO';

@Component({
  selector: 'ajouterMesurePage',
  templateUrl: 'ajouterMesurePage.html'
})
export class AjouterMesurePage {

  mensurations;
  mensurationsFilter;
  dateDateTime:string;
  dateMax:string;
  mensuration:number;
  mesure:number;
  msgError:string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private mesureDAO:MesureDAO, private mensurationDAO:MensurationDAO) {
    this.initVariables();
  }

  private initVariables() {
    this.msgError = "";
    this.mensurationDAO.getMensurations ().then((resolve) => {
      this.mensurations = resolve;
      let dateToday = this.traiterDate10Carac(new Date ().toISOString());
      this.mesureDAO.getMensurationsDateFilter (dateToday).then((resolve2) => {
        this.mensurationsFilter = resolve2;  
        this.traitementMensurationsFiltre();
        this.mensuration = this.mensurations[0].id;
      })
    })
  } // initVariables

  //Supprime les éléments qui ont deja ajouté une mensuration pour aujourd'hui !
  private traitementMensurationsFiltre () {
    for (let x=0; x < this.mensurationsFilter.length; x++) {
      let m = this.mensurationsFilter[x];
      for (let y=this.mensurations.length-1; y >= 0; y--) {
        if (m.idMen == this.mensurations[y].id) {
          this.mensurations.splice (y, 1);
        }
      }
    }
  } // traitementMensurationsFiltre

  private annuler () {
    this.navCtrl.pop();
  } // annuler

  private ajouterMesure () {
    if (this.isValide ()) {
      this.msgError = ""
      let date = this.traiterDate10Carac(new Date ().toISOString()); //date du jour avec format :2017.09.05
      Promise.all([
        this.mesureDAO.addMesure(date, Math.round(this.mesure*10)/10, 1, this.mensuration),
        this.navCtrl.pop()
      ]);
    } else {
      this.msgError = "Veuillez ajouter une mesure valide";
    }
  } // ajouterMesure

  private isValide () {
    let valide = true;
    if (this.mesure <= 0 || this.mesure > 999 || this.mesure == undefined) {
      valide = false;
    }
    return valide;
  } // isValide

  //date en paramètre : "2017-09-01T06:24:24.934Z""
  //date en sortie : "2017-09-01"
  private traiterDate10Carac (date:string) {
    let dateStr = date.substr(0,10);
    return dateStr;
  } // traiterDate10Carac

} // AjouterMesurePage


