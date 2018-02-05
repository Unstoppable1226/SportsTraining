//package AjouterSerie

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//pages
import {DetailsExercicePage} from '../detailsExercice/detailsExercicePage';

//providers
import { SerieDAO } from '../../app/providers/serieDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//domaines
import { Exercice } from '../../app/domaines/exercice';
import { Serie } from '../../app/domaines/serie';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'ajouterSeriePage',
  templateUrl: 'ajouterSeriePage.html'
})

export class AjouterSeriePage {

  private nbSerie:number;
  private nbRep:number;
  private poids:number = 30;
  private pause:number;
  private tempsMin:number;
  private tempsSec:number;
  private distance:number;
  private depense:number;
  private idEnt:number;
  private idExe:number;
  private msgError: string;
  private clear:boolean;
  private type:number;

  constructor(private navCtrl: NavController, private nativeStorage: NativeStorage, private serieDAO:SerieDAO, private exerciceDAO:ExerciceDAO, private utilisateurDAO:UtilisateurDAO) {
    this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
    .then(
      data => {
        this.idEnt = data.idEnt;
        this.nativeStorage.getItem(Constantes.NS_ID_EXERCICE)
        .then(
          data => {
            this.idExe = data;
            this.initVariables();
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  } // constructor

  private initVariables () : void {
    this.nbSerie = 1;
    this.nbRep = 10;
    this.poids = 30;
    this.pause = 60;
    this.msgError = "";
    this.clear = false;
    this.tempsMin = 20;
    this.tempsSec = 0;
    this.distance = 5;
    this.depense = 200;

    this.exerciceDAO.getTypeExercice(this.idExe).then((resolve:Exercice) => {
      this.type = resolve.getType();
      this.serieDAO.getLastSerieExercice(resolve.getId()).then ((resolve2:Serie) => {
        if (this.type == 0) { 
          // type == 0 donc cardio
          this.tempsMin = resolve2.getTempsMin();
          this.tempsSec = resolve2.getTempsSec();
          this.distance = resolve2.getDistance();
          this.depense = resolve2.getDepense();
        } else {
          // type == 1 donc muscu
          this.nbSerie = resolve2.getNombre();
          this.nbRep = resolve2.getRepetition();
          this.poids = resolve2.getPoids();
        }
        this.pause = resolve2.getPause();
      })
    })

  } // initVariables
  
  private incNbSerie() {this.nbSerie = this.nbSerie + 1;} // incNbSerie

  private decNbSerie() {
  	if (this.nbSerie > 1) {
  		this.nbSerie = this.nbSerie - 1;
  	}  	
  } // decNbSerie

  private incNbRep() {
  	this.nbRep = this.nbRep + 1;
  } // incNbRep

  private decNbRep() {
  	if (this.nbRep > 1) {
  		this.nbRep = this.nbRep - 1;
  	}  	
  } // decNbRep

  private incPause() {this.pause = this.pause + 1;} // incPause

  private decPause() {
  	if (this.pause >= 1) {
  		this.pause = this.pause - 1;
  	}  	
  }  //decPause

  private incPoids() {
    this.poids = this.poids + 1;
  } // incPoids

  private decPoids() {
    if (this.poids >= 1) {
      this.poids = this.poids - 1;
    }    
  } // decPoids

  private incTempsMin() {this.tempsMin = this.tempsMin + 1;} // incTempsMin

  private decTempsMin() {
    if (this.tempsMin >= 1) {
      this.tempsMin = this.tempsMin - 1;
    }
  } // decTempsMin

  private incTempsSec() {
    if (this.tempsSec < 59) {
      this.tempsSec = this.tempsSec + 1;
    }
  } // incTempsSec

  private decTempsSec() {
    if (this.tempsSec >= 1) {
      this.tempsSec = this.tempsSec - 1;
    }
  } // decTempsSec

  private incDistance() {this.distance = this.distance + 1;} // incDistance

  private decDistance() {
    if (this.distance >= 1) {
      this.distance = this.distance - 1;
    }
  } // decDistance

  private incDepense() {this.depense = this.depense + 1;} // incDepense

  private decDepense() {
    if (this.depense >= 1) {
      this.depense = this.depense - 1;
    }
  } // decDepense

  private ajouterSerie() {
    if (this.isValide()) {
      if (this.type == 0) {
        Promise.all([
          this.serieDAO.ajouterSerieCardio(Math.floor(this.tempsMin), Math.floor(this.tempsSec), Math.round(this.distance*100)/100, Math.floor(this.depense), Math.floor(this.pause), this.idEnt, this.idExe),
          this.utilisateurDAO.updateExperienceUtilisateur(Constantes.ID_UTILISATEUR, Constantes.EXPERIENCE_SERIE),
          this.navCtrl.pop()
        ]);
        ;
      }else {
        let poids:number;
        if (this.clear) {poids = Math.floor(this.poids) + 0.5;} else {poids = this.poids;}
         Promise.all([
           this.serieDAO.ajouterSerieMuscu(this.nbRep, this.nbSerie, poids, this.pause, this.idEnt, this.idExe),
           this.utilisateurDAO.updateExperienceUtilisateur(Constantes.ID_UTILISATEUR, Constantes.EXPERIENCE_SERIE),
           this.navCtrl.pop()
         ]);
      }
    }
  } // ajouterSerie

  private isValide () : boolean {
    let valide = true;
    this.msgError = "";
    if ( isNaN(this.distance) || this.tempsMin > 999 || this.tempsSec > 59 || this.distance > 999 || this.pause > 999 || this.nbRep > 999 || this.nbSerie > 999 || 
      this.poids > 999 || this.depense > 999 || this.poids < 0 || this.pause < 0 || this.tempsMin < 0 || this.tempsSec < 0 || this.distance < 0 || this.depense < 0 ) {
      this.msgError = "Données pas valides";
      valide = false;
    }
    return valide;
  } // isValide

  private ajouterUneDemi() {
    if (this.clear) {
      this.clear = false;
    }else {
      this.clear = true;      
    }
  } // ajouterUneDemi

} // AjouterSeriePage


