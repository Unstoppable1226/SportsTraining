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
import { Succes } from '../../app/domaines/succes';

@Injectable()
export class SuccesDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {

	} // constructor

	public  getSuccesUtilisateur (idUti:number) {
		return new Promise ((resolve, reject) => {
	  		let lst: Array<Succes> = [];
		    let req = "SELECT suc_id, suc_nom, suc_experience, suc_image FROM spt_succes JOIN spt_debloque ON suc_id = deb_suc_id WHERE deb_uti_id = " + idUti + " ORDER BY suc_experience ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let suc : Succes;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	suc = new Succes (); // data.rows.item(i).app_nom
				          	suc.setId(data.rows.item(i).suc_id);
				          	suc.setNom(data.rows.item(i).suc_nom);
				          	suc.setExperience(data.rows.item(i).suc_experience);
				          	suc.setImage(data.rows.item(i).suc_image);
				            lst.push(suc);
				      	}
			      		resolve (lst);
		        	}
		      	}
		      	resolve (lst);
		    });
		});
	} // getSuccesUtilisateur

	public  getSuccesExperience (experienceUti:number) {
		return new Promise ((resolve, reject) => {
	  		let lst: Array<Succes> = [];
		    let req = "SELECT suc_id, suc_nom, suc_experience, suc_image FROM spt_succes WHERE suc_experience <=  " + experienceUti + " ORDER BY suc_experience ASC";
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
				          	suc.setExperience(data.rows.item(i).suc_experience);
				          	suc.setImage(data.rows.item(i).suc_image);
				            lst.push(suc);
				      	}
			      		resolve (lst);
		        	}
		      	}
		      	resolve (lst);
		    });
		});
	} // getSuccesExperience

	public insertSuccesUtilisateur (idUti:number, idSuc:number) {
		this.sqliteDAO.db.executeSql('INSERT INTO `spt_debloque` (deb_uti_id, deb_suc_id) VALUES (?, ?)', [ idUti, idSuc ])
    	.then(() => {console.log("Succes Utilisateur inserted");})
    	.catch(e => console.log(e));
	} // insertSuccesUtilisateur
 
} // SuccesDAO


