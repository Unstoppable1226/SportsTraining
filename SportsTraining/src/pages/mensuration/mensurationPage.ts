//package mensuration

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1

*/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//pages
import { AjouterMesurePage } from '../ajouterMesure/ajouterMesurePage';

//providers
import { MesureDAO } from '../../app/providers/mesureDAO';

@Component({
  selector: 'mensurationPage',
  templateUrl: 'mensurationPage.html'
})
export class MensurationPage {

	dates;
	indiceCourant:number;
	data = {};
	backState:boolean;
	nextState:boolean;

	constructor(private navCtrl: NavController, private mesureDAO:MesureDAO) {
		//this.onCreate ();
	} // constructor

  //methode déclanché quand on revient dans cette vue
  ionViewWillEnter() {
    this.onCreate ();
  }

  private onCreate () {
  	this.mesureDAO.getDatesMesures ().then((resolve) => {
  		this.dates = resolve;
  		this.indiceCourant = this.dates.length - 1;
      if (this.dates.length == 0) {
  		  
      }else {
        this.recupererDonnes();
      }
      this.EtatInitialBtn();
  	});
  	
  } // onCreate

  private EtatInitialBtn () {
    if (this.dates.length == 0) {
      this.backState = true;
      this.nextState = true;
    }else {
      if (this.dates.length == 1) {
        this.backState = true;
        this.nextState = true;
      }else{
        this.backState = false;
       this.nextState = true;
      } 
    }
  } // EtatInitialBtn

  private  recupererDonnes (){
    	let dateStr = this.dates[this.indiceCourant].date;
    	let lstMensurations; 
    	this.mesureDAO.getMesuresMensurations (dateStr).then((resolve) => {
    		lstMensurations = resolve;
    		this.data = {date: this.traiterDateYMD(dateStr), mensurations: lstMensurations};
    	})
  } //recupererDonnes 

  //date en paramètre : "2017-09-01"
  //date en sortie : "01.09.2017"
  private traiterDateYMD (date:string) {
    let annee = date.substr(0,4);
    let mois = date.substr(5,2);
    let jours = date.substr(8,2);
    return jours + "." + mois + "." + annee;
  } // traiterDateYMD

  private afficherAjouterMesurePage () {
  	this.navCtrl.push(AjouterMesurePage);
  } // afficherAjouterMesurePage

  private back () {
  	if (this.indiceCourant == 1) {
  		this.backState = true;
  	}
    this.nextState = false;

  	this.indiceCourant = this.indiceCourant - 1;
  	this.recupererDonnes();
  } // back

  private next () {
  	if (this.indiceCourant == this.dates.length-2) {
  		this.nextState = true;
  	}
  	this.backState = false;
  	
  	this.indiceCourant = this.indiceCourant + 1;
  	this.recupererDonnes();
  } // next
 
} // MensurationPage


