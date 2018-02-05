//package Glossaire

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DetailsExercicePage } from '../detailsExercice/detailsExercicePage';
import { GlossaireDetailsPage } from '../glossaireDetails/glossaireDetailsPage';


import { MuscleDAO } from '../../app/providers/muscleDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';//Constantes.NS_ID_ENTRAINEMENT

@Component({
  selector: 'glossairePage',
  templateUrl: 'glossairePage.html'
})
export class GlossairePage {

  muscles;
  exercices;
  affichageExercices:boolean;
  affichageMuscles:boolean;
  listeState:boolean;
  exercicesState:boolean;
  exerciceTri:boolean;
  couleurBtnExerciceAZ : string;
  couleurBtnExerciceMuscle : string;
  dataExercicesMuscles;
  lstExercicesMuscle;

  constructor( private navCtrl: NavController, private muscleDAO: MuscleDAO, private exerciceDAO: ExerciceDAO, private nativeStorage: NativeStorage) {
    this.listeState = true;
    this.exercicesState = true;
    this.affichageMuscles = false;
    this.affichageExercices = false;
    this.exerciceTri = true;
    this.couleurBtnExerciceAZ = "secondary";
    this.couleurBtnExerciceMuscle = "primary";
    this.muscles = [];
    this.exercices = [];
    this.dataExercicesMuscles = [];
    
    Promise.all([
      this.nativeStorage.setItem(Constantes.NS_UPDATED_EXERCICE_ID, {idExe:0, nomExe: ""}),
      this.nativeStorage.setItem(Constantes.NS_DELETED_EXERCICE_ID, {idExe:0}),
      muscleDAO.getMuscles().then((resolve) => { this.muscles = resolve; }),
      exerciceDAO.getExercices().then((resolve) => { this.exercices = resolve; this.getListExercicesTriesParMuscles ();})
    ])

  } // constructor

  ionViewDidEnter () {
    let idExeDeleted;
    let idExeUpdated;
    let nomExe;

    this.nativeStorage.getItem(Constantes.NS_DELETED_EXERCICE_ID).then(data => {
      idExeDeleted = data.idExe; 
      this.nativeStorage.getItem(Constantes.NS_UPDATED_EXERCICE_ID).then(data2 => {
        idExeUpdated = data2.idExe; nomExe = data2.nomExe; 

          if (idExeDeleted >= 1) {
            this.supprimerOuModifierExerciceView (idExeDeleted, 1, "")

            this.nativeStorage.setItem(Constantes.NS_DELETED_EXERCICE_ID, {idExe:0});
          }else if (idExeUpdated >= 1) {
            this.supprimerOuModifierExerciceView (idExeUpdated, 2, nomExe)

             this.nativeStorage.setItem(Constantes.NS_UPDATED_EXERCICE_ID, {idExe:0, nomExe: ""});
          }

      })
    })

  } // ionViewDidEnter


  //supprime ou modifie un exo dans les listes présentes dans la vue, typeTraiement = 1 pour suppression, 2 pour mise à jour 
  private supprimerOuModifierExerciceView (idExe:number, typeTraitement:number, nomExe:string) {

      //on supprime l'exercice des données en cours dans la vue
      for (let i=0; i<this.exercices.length; i++) {
        if (this.exercices[i].getId() == idExe) {
          if (typeTraitement == 1) {
            this.exercices.splice(i, 1);
          }else {
             this.exercices[i].setNom(nomExe)
          }
        }
      }
      //on supprime ou modifie suivant le type de traitement en parametre l'exercice dans la listes des exo triés par muscle
      for (let i=0; i<this.dataExercicesMuscles.length; i++) {
        let exos = this.dataExercicesMuscles[i].exercices;
        for (let j=0; j<exos.length; j++) {
          if (exos[j].getId() == idExe) {
            
            if (typeTraitement == 1) {
              this.dataExercicesMuscles[i].exercices.splice(j, 1);
            }else {
               this.dataExercicesMuscles[i].exercices[j].setNom(nomExe)
            }
          }
        }
      }

  } // supprimerOuModifierExerciceView

  private afficherExercices() {
    this.listeState = false;
    this.exercicesState = true;
    this.exerciceTri = true;
  } //afficherExercices

  private afficherMuscles () {
    this.listeState = false;
    this.exercicesState = false;
  } // afficherMuscles

  private afficherExercicesAZ () {
    this.exerciceTri = true;
    this.exerciceDAO.getExercices().then((resolve) => {
      this.exercices = resolve;
      this.couleurBtnExerciceAZ = "secondary";
      this.couleurBtnExerciceMuscle = "primary";
    })
  } // afficherExercicesAZ

  private afficherExercicesMuscle () {
    this.exerciceTri = false;
    this.couleurBtnExerciceAZ = "primary";
    this.couleurBtnExerciceMuscle = "secondary";
  } // afficherExercicesMuscle

  private getListExercicesTriesParMuscles() {
    this.muscleDAO.getMuscles().then((resolve) => {
      this.muscles = resolve;
      this.dataExercicesMuscles = [];
      for (let x = 0; x < this.muscles.length; x++) {
        let idMus = this.muscles[x].getId();
        let lstExercices = [];
        for (let y = 0; y < this.exercices.length; y++) {
          if (this.exercices[y].getMusId() == idMus) {
            lstExercices.push(this.exercices[y]);
          }
        }
        this.dataExercicesMuscles.push({
          muscle: this.muscles[x],
          exercices: lstExercices
        })
      }
    })
  } // getListExercicesTriesParMuscles

  private afficherDetailsExercice (id:number) {
    this.navCtrl.push(GlossaireDetailsPage, {detail : 1, id : id}); //1 pour exercice
  } // afficherDetailsExercice

  private afficherDetailsMuscle (id:number) {
    this.navCtrl.push(GlossaireDetailsPage, {detail : 2, id : id}); //2 pour muscle
  } // afficherDetailsMuscle

} // GlossairePage





