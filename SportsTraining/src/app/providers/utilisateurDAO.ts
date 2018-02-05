//package providers

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { SqliteDAO } from '../../app/providers/sqliteDAO';

//domaines
import { Utilisateur } from '../../app/domaines/utilisateur';
import { Succes } from '../../app/domaines/succes';

@Injectable()
export class UtilisateurDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {
	} // constructor

	public getUtilisateur (id:number) {
	    return new Promise ((resolve, reject) => {
	  		let uti : Utilisateur = new Utilisateur ();
		    let req = "SELECT uti_id, uti_nom, uti_prenom, uti_dateNais, uti_experience FROM spt_utilisateur WHERE uti_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
			      			uti.setId(data.rows.item(i).uti_id);
				          	uti.setNom(data.rows.item(i).uti_nom);
				          	uti.setPrenom(data.rows.item(i).uti_prenom);
				          	uti.setDateNais(data.rows.item(i).uti_dateNais);
				          	uti.setExperience(data.rows.item(i).uti_experience);
				      	}
			      		resolve (uti);
		        	}
		      	}
		      	resolve (uti);
		    });
		});
  	} // getUtilisateur

  	public updateUtilisateur (id:number, nom:string, prenom:string, dateNais:string) {
  		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('UPDATE `spt_utilisateur` SET uti_nom = ?, uti_prenom = ?, uti_dateNais = ? WHERE uti_id = ?', [ nom, prenom, dateNais, id ])
	    .then(() => {console.log("utilisateur updated");})
	    .catch(e => console.log(e));
  	} // updateUtilisateur

  	public updateExperienceUtilisateur (id:number, experience:number) {
  		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('UPDATE `spt_utilisateur` SET uti_experience = uti_experience + ? WHERE uti_id = ?', [ experience, id ])
	    .then(() => {console.log("Experience utilisateur updated");})
	    .catch(e => console.log(e));
  	} // updateExperienceUtilisateur

  	public getExperience (id:number) {
	    return new Promise ((resolve, reject) => {
	  		let experience : number;
		    let req = "SELECT uti_experience FROM spt_utilisateur WHERE uti_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
				      	experience = data.rows.item(0).uti_experience
			      		resolve (experience);
		        	}
		      	}
		      	resolve (experience);
		    });
		});
  	} // getExperience

  	public getSuccesUtilisateur (idUti:number){
  		return new Promise ((resolve, reject) => {
	  		let list: Array<Succes> = [];
		    let req = "SELECT uti_id, uti_experience, suc_id, suc_nom, suc_image FROM spt_utilisateur JOIN spt_debloque ON deb_uti_id = uti_id JOIN spt_succes ON deb_suc_id = suc_id WHERE uti_id = " + idUti;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let suc : Succes;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	suc = new Succes ();
				          	suc.setId(data.rows.item(i).suc_id);
				          	suc.setNom(data.rows.item(i).suc_nom);
				          	suc.setImage(data.rows.item(i).suc_image);
				          	list.push(suc);
				      	}
			      		resolve (list);
		        	}
		      	}
		      	resolve (list);
		    });
		});
  	} // getSuccesUtilisateur

} // AppreciationDAO


