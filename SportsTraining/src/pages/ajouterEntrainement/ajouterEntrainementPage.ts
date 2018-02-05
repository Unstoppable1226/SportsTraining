//package ajouterEntrainement

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
import { EntrainementDAO } from '../../app/providers/entrainementDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//pages
import { EntrainementsPage } from '../entrainements/entrainementsPage';

//settings
import { Constantes } from '../../app/settings/constantes';//Constantes.NS_ID_ENTRAINEMENT

@Component({
  selector: 'ajouterEntrainementPage',
  templateUrl: 'ajouterEntrainementPage.html'
})
export class AjouterEntrainementPage {

	nom : string;
	date : string;
	duree : number;
	datePlaceHolder:string;
	dateMax:string;
	today : Date;
  nomError:string;
  dureeError:string;

    constructor(public navCtrl: NavController, public entrainementDAO: EntrainementDAO, public alertCtrl: AlertController, public utilisateurDAO:UtilisateurDAO) {
    	this.initVariables();
    }

    private initVariables() {
    	//date du jours pour initialiser le composant ion-datetime
    	this.today = new Date(); //Sun Sep 03 2017 08:26:12 GMT+0200 (CEST)
    	this.date = this.today.toISOString(); //2017-09-03T06:24:24.934Z
    	//l'année max est tjrs l'année actuelle + 1
    	this.dateMax = "" + (this.today.getFullYear()+1) + "-12-31"; //2018-12-31
      this.nomError = "";
      this.dureeError = "";
      this.nom = "";
      this.duree = 60;
    } // initVariables


    private ajouterEntrainement () : void {
      if (this.isValide(this.nom, this.duree)) {
        let date = this.date.substr(0, 10) //2017-09-03 == 10 caractères
        Promise.all ([
          this.entrainementDAO.ajouterEntrainement(this.nom, date, Math.floor(this.duree)),
          this.utilisateurDAO.updateExperienceUtilisateur(Constantes.ID_UTILISATEUR, Constantes.EXPERIENCE_ENTRAINEMENT),
          this.showAlert(),
          this.navCtrl.pop()
        ])
        .then(() => {});
      }
    } // ajouterEntrainement

    private isValide (nom:string, duree:number) : boolean {
      let valide = true;

      if (nom.length == 0) {
        this.nomError = "Entrer un nom";
        valide = false;
      }else {
        this.nomError = "";
      }

      if (duree <= 0) {
        this.dureeError = "Entrer une durée";
        valide = false;
      }else {
        if (this.duree.toString().length > 3) {
          this.dureeError = "La durée ne doit comporter que 3 caractères au maximum !";
          valide = false;
        }else {
          this.dureeError = "";
        }
      }

      return valide;
    } // isValide

    private showAlert() {
	    let alert = this.alertCtrl.create({
	    	title: '',
	    	subTitle: 'L\'entrainement a été ajouté !',
	    	buttons: ['OK']
	    });
	    alert.present();
	  } // showAlert

	private annuler () {
		this.navCtrl.pop();
	} // annuler

} // AjouterEntrainementPage


