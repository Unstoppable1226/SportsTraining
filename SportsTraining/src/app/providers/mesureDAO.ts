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
import { Mesure } from '../../app/domaines/mesure';
import { Mensuration } from '../../app/domaines/mensuration';

@Injectable()
export class MesureDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {
	} // constructor

	public addMesure(date:string, mesure:number, idUti:number, idMensu:number) : void {
		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ date, mesure, idUti, idMensu ])
	    .then(() => {console.log("Mesure inserted");})
	    .catch(e => console.log(e));
	} // addMesure
	
	public  getMesures () {
		return new Promise ((resolve, reject) => {
	  		let mesures: Array<Mesure> = [];
		    let req = "SELECT mes_id, mes_date, mes_mesure, mes_uti_id, men_id, men_nom, men_unite FROM spt_mesure JOIN spt_mensuration ON mes_men_id = men_id ORDER BY mes_date ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let mus : Mesure;
		          		let men : Mensuration;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	mus = new Mesure (); // data.rows.item(i).app_nom
				          	mus.setId(data.rows.item(i).mes_id);
				          	mus.setDate(data.rows.item(i).mes_date);
				          	mus.setMesure(data.rows.item(i).mes_mesure);
				          	mus.setIdUti(data.rows.item(i).mes_uti_id);
				          	men = new Mensuration ();
				          	men.setId(data.rows.item(i).men_id);
				          	men.setNom(data.rows.item(i).men_nom);
				          	men.setUnite(data.rows.item(i).men_unite);
				          	mus.setMensuration(men);
				            mesures.push(mus);
				      	}
			      		resolve (mesures);
		        	}
		      	}
		      	resolve (mesures);
		    });
		});
	} // getMesures


	public getMesure (id:number) {
	    return new Promise ((resolve, reject) => {
	  		let mesures: Array<Mesure> = [];
		    let req = "SELECT mes_id, mes_date, mes_mesure, mes_uti_id, men_id, men_nom, men_unite FROM spt_mesure JOIN spt_mensuration ON mes_men_id = men_id WHERE mes_id = ?";
		    this.sqliteDAO.db.executeSql(req, [ id ])
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		//let date, annee, mois, jours : string = "";
		          		let mus : Mesure;
		          		let men : Mensuration;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	mus = new Mesure (); 
				          	mus.setId(data.rows.item(i).mes_id);
				          	mus.setDate(data.rows.item(i).mes_date);
				          	mus.setMesure(data.rows.item(i).mes_mesure);
				          	mus.setIdUti(data.rows.item(i).mes_uti_id);
				          	men = new Mensuration ();
				          	men.setId(data.rows.item(i).men_id);
				          	men.setNom(data.rows.item(i).men_nom);
				          	men.setUnite(data.rows.item(i).men_unite);
				          	mus.setMensuration(men);
				            mesures.push(mus);
				      	}
			      		resolve (mesures);
		        	}
		      	}
		      	resolve (mesures);
		    });
		});
  	} // getMesure

  	public  getMensurationsDateFilter (dateToday:string) {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Object> = [];
		    let req = 'SELECT mes_id, mes_date, mes_mesure, mes_men_id FROM spt_mesure WHERE mes_date = \'' + dateToday + '\'';
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            mensurations.push({
				            	id : data.rows.item(i).mes_id,
				            	date : data.rows.item(i).mes_date,
				            	mesure : data.rows.item(i).mes_mesure,
				            	idMen : data.rows.item(i).mes_men_id				            	
				            });
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getMensurationsDateFilter

	public  getDatesMesures () {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Object> = [];
		    let req = "SELECT mes_date FROM spt_mesure GROUP BY mes_date ORDER BY mes_date ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            mensurations.push({
				            	/*menId : data.rows.item(i).men_id,
				            	nom : data.rows.item(i).men_nom,
				            	unite : data.rows.item(i).men_unite,
				            	mesId : data.rows.item(i).mes_id,
				            	mesure : data.rows.item(i).mes_mesure,*/
				            	date : data.rows.item(i).mes_date
				            });
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getDatesMesures

	public  getMesuresMensurations (date:string) {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Object> = [];
		    let req = 'SELECT men_nom, men_unite, mes_mesure FROM spt_mesure JOIN spt_mensuration ON men_id = mes_men_id WHERE mes_date = \'' + date + '\' ORDER BY men_nom';
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            mensurations.push({
				            	nom : data.rows.item(i).men_nom,
				            	unite : data.rows.item(i).men_unite,
				            	mesure : data.rows.item(i).mes_mesure
				            });
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getMesuresMensurations

	
	public  getLastMesuresDate () {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Object> = [];
		    let req = 'SELECT men_nom, men_unite, mes_mesure, "(" || substr(mes_date, 9, 2) || "." || substr(mes_date, 6, 2)  || "." || substr(mes_date, 0, 5) || ")" as "date" FROM spt_mensuration LEFT JOIN spt_mesure ON men_id = mes_men_id GROUP BY men_nom';
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            mensurations.push({
				            	nom : data.rows.item(i).men_nom,
				            	unite : data.rows.item(i).men_unite,
				            	mesure : data.rows.item(i).mes_mesure,
				            	date : data.rows.item(i).date
				            });
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getLastMesuresDate

	public  getMesuresMensuration (idMensuration:number) {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Object> = [];
		    let req = 'SELECT mes_mesure, substr(mes_date, 9, 2) || "." || substr(mes_date, 6, 2)  || "." || substr(mes_date, 0, 5) as "date" FROM spt_mesure WHERE mes_men_id = ' + idMensuration + ' ORDER BY mes_date ASC';
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            mensurations.push({
				            	mesure : data.rows.item(i).mes_mesure,
				            	date : data.rows.item(i).date
				            });
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getMesuresMensuration
 
} // AppreciationDAO


