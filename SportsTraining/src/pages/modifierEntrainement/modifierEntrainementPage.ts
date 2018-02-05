//package ModifierEntrainement

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
import { AppreciationDAO } from '../../app/providers/appreciationDAO';

//pages
import { DetailsEntrainementPage } from '../detailsEntrainement/detailsEntrainementPage';

//domaines
import { Entrainement } from '../../app/domaines/entrainement';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'modifierEntrainementPage',
  templateUrl: 'modifierEntrainementPage.html'
})
export class ModifierEntrainementPage {

  nom : string;
  date : string;
  duree : number;
  datePlaceHolder:string;
  dateMax:string;
  today : Date;
  nomError:string;
  dureeError:string;
  appreciations;
  appreciation:number;
  idEntrainement:number;
  entrainements;

  constructor(public navCtrl: NavController, public entrainementDAO: EntrainementDAO, private nativeStorage: NativeStorage , public alertCtrl: AlertController, private appreciationDAO:AppreciationDAO) {
  	this.initVariables();

    appreciationDAO.getAppreciations().then((resolve) => {this.appreciations = resolve})

    this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
    .then(
      data => {
        this.idEntrainement = data.idEnt;
        entrainementDAO.getEntrainement (this.idEntrainement).then((resolve) => {
          this.entrainements = resolve;
          this.nom = (this.entrainements[0]).getNom();
          this.date = this.traiterDate(this.entrainements[0].getDate());
          this.duree = (this.entrainements[0]).getDuree();
          this.appreciation = (this.entrainements[0]).getAppreciation().getId();
        })
      },
      error => console.error(error)
    );

  } // constructor

  private initVariables() {
  	//date du jours pour initialiser le composant ion-datetime
  	this.today = new Date(); //Sun Sep 03 2017 08:26:12 GMT+0200 (CEST)
  	this.date = this.today.toISOString(); //2017-09-03T06:24:24.934Z
  	//l'année max est tjrs l'année actuelle + 1
  	this.dateMax = "" + (this.today.getFullYear()+1) + "-12-31"; //2018-12-31
    this.nomError = "";
    this.dureeError = "";
    this.nom = "";
    this.duree = 0;
    this.appreciation = 0;
  } // initVariables

  //date en paramètre : "01.09.2017"
  //date en sortie : "2017-09-01"
  private traiterDate (date:string) {
    let annee = date.substr(6,4);
    let mois = date.substr(3,2);
    let jours = date.substr(0,2);
    return annee + "-" + mois + "-" + jours + "T06:24:24.934Z";
  } // traiterDate

  private modifierEntrainement () : void {
    if (this.isValide(this.nom, this.duree)) {
      let date = this.date.substr(0, 10) //2017-09-03 == 10 caractères
      Promise.all ([
        this.entrainementDAO.updateEntrainement(this.idEntrainement, this.nom, date, Math.floor(this.duree), this.appreciation),
        this.showAlert(),
        this.navCtrl.pop()
      ])
      .then(() => {});
    }
  } // modifierEntrainement

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
    	subTitle: 'L\'entrainement a été enregistré !',
    	buttons: ['OK']
    });
    alert.present();
	} // showAlert

	private annuler () {
		this.navCtrl.pop();
	} // annuler

} // ModifierEntrainementPage


