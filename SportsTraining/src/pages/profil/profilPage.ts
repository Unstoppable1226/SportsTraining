//package Profil

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
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';
import { MesureDAO } from '../../app/providers/mesureDAO';

//pages
import { MensurationPage } from '../mensuration/mensurationPage';

//domaines
import { Entrainement } from '../../app/domaines/entrainement';
import { Utilisateur } from '../../app/domaines/utilisateur';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'profilPage',
  templateUrl: 'profilPage.html'
})
export class ProfilPage {

  etatModifier : boolean;
  idUti:number;
  prenom:string;
  nom:string;

  dateNaisYMD:string;
  dateNaisDMY:string;
  dateNaisDT:string;

  newPrenom:string;
  newNom:string;
  newDateNaisYMD:string;
  newDateNaisDMY:string;
  newDateNaisDT:string;

  dateMax:string;

  mensurations;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private utilisateurDAO:UtilisateurDAO, private mesureDAO:MesureDAO) {

  } // constructor

  //methode déclanché quand on entre dans la vue
  ionViewWillEnter() {
    this.onCreate ();
  }

  private onCreate (){
    this.initVariables();
  } // onCreate

  private initVariables() {
  	this.etatModifier = false;
    this.utilisateurDAO.getUtilisateur (1).then((resolve:Utilisateur) => {
      this.idUti = resolve.getId();
      this.prenom = resolve.getPrenom();
      this.nom = resolve.getNom();
      this.dateNaisYMD = resolve.getDateNais(); //1992-05-09
      this.dateNaisDT = this.dateNaisYMD + "T06:24:24.934Z"; //1992-05-09T06:24:24.934Z
      this.dateNaisDMY = this.traiterDateYMD (this.dateNaisYMD);
      this.dateMax = (new Date().getFullYear()+1) + "-12-31"; //2018-12-31
    });
    this.mesureDAO.getLastMesuresDate().then((resolve) => {
      this.mensurations = resolve
    })

  } // initVariables

  //date en paramètre : "01.09.2017"
  //date en sortie : "2017-09-01T06:24:24.934Z"
  private traiterDateDMYDT (date:string) {
    let annee = date.substr(6,4);
    let mois = date.substr(3,2);
    let jours = date.substr(0,2);
    return annee + "-" + mois + "-" + jours + "T06:24:24.934Z";
  } // traiterDateDMYDT

  //date en paramètre : "2017-09-01T06:24:24.934Z""
  //date en sortie : "2017-09-01"
  private traiterDate10Carac (date:string) {
    let dateStr = date.substr(0,10);
    return dateStr;
  } // traiterDate10Carac

  //date en paramètre : "2017-09-01"
  //date en sortie : "01.09.2017"
  private traiterDateYMD (date:string) {
    let annee = date.substr(0,4);
    let mois = date.substr(5,2);
    let jours = date.substr(8,2);
    return jours + "." + mois + "." + annee;
  } // traiterDateYMD

  private modifierInformations() {
    if (this.etatModifier) {
      this.etatModifier = false
      //this.dateNaisDT = this.dateNaisYMD
    }else {
      this.newPrenom = this.prenom;
      this.newNom = this.nom;
      //this.newDateNaisYMD;
      //this.newDateNaisDMY;
      this.newDateNaisDT = this.dateNaisDT;

      this.etatModifier = true;
    }
  } // modifierInformations

  private annulerModification () {
    this.etatModifier = false;
  } // annulerModification

  private enregistrerUtilisateur () {
    this.nom = this.newNom;
    this.prenom = this.newPrenom;
    this.dateNaisYMD = this.traiterDate10Carac(this.newDateNaisDT); //1992-05-09
    this.dateNaisDT = this.dateNaisYMD + "T06:24:24.934Z"; //1992-05-09T06:24:24.934Z
    this.dateNaisDMY = this.traiterDateYMD (this.dateNaisYMD);
    this.utilisateurDAO.updateUtilisateur (1, this.nom, this.prenom, this.dateNaisYMD);
    this.etatModifier = false;
  } // enregistrerUtilisateur

  private afficherMensurations () {
    Promise.all([  
      this.navCtrl.push(MensurationPage)
    ])
    .then(() => {
    });
  } // afficherMensurations

} // ProfilPage


