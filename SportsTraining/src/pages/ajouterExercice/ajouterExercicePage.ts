//package ajouterExercice

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup,FormControl} from '@angular/forms';

//pages
import { AjouterExerciceEntrainementPage } from '../ajouterExerciceEntrainement/ajouterExerciceEntrainementPage';

//providers
import { MuscleDAO } from '../../app/providers/muscleDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'ajouterExercicePage',
  templateUrl: 'ajouterExercicePage.html'
})
export class AjouterExercicePage {

  private muscles;
  private nom:string;
  private description:string;
  private muscle:number;
  private type: number;
  private msgError: string;

  radioGroup;
  radioForm;

  constructor(private navCtrl: NavController, private muscleDAO:MuscleDAO, private exerciceDAO:ExerciceDAO, public utilisateurDAO:UtilisateurDAO) {
    this.nom = "";
    this.description = "";
    this.msgError = "";
    muscleDAO.getMuscles ().then((resolve) => {
      this.muscles = resolve
    })
    this.radioForm = new FormGroup({
      "radioGroup": new FormControl({value: '1', disabled: false})
    });

    this.muscle = 2;
    this.type = 1;
  } // constructor

  private ajouterExercice () {
    if (this.isValide(this.nom, this.description)) {
      this.msgError = "";
      let muscle:number;
      let image:string;
      if (this.type == 0) {
        muscle = 1;
        image = Constantes.IMAGE_CARDIO_DEFAULT;
      }else {
        muscle = this.muscle;
        image = Constantes.IMAGE_MUSCU_DEFAULT;
      }

      Promise.all ([
        this.exerciceDAO.insertExercice(this.nom, this.description, this.type, muscle, image),
        this.utilisateurDAO.updateExperienceUtilisateur(Constantes.ID_UTILISATEUR, Constantes.EXPERIENCE_EXERCICE),
        this.navCtrl.pop()
      ])
      .then(() => {});
    }else {
      this.msgError = "Entrer un nom et une description";
    }
  } // ajouterExercice

  private isValide(nom:string, description:string) : boolean {
    if (nom == "" || description == "") {
      return false;
    }
    return true;
  } // isValide

  private doSubmit(event) {
    event.preventDefault();
  } // doSubmit

} // AjouterExercicePage


