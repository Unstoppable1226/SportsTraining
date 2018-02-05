//package providers

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Injectable, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

//providers
import { SqliteDAO } from '../../app/providers/sqliteDAO';

//domaines
import { Serie } from '../../app/domaines/serie';

@Injectable()
export class SerieDAO {

	constructor(private sqlite: SQLite, private sqliteDAO: SqliteDAO, private nativeStorage: NativeStorage) {} // constructor

	public ajouterSerieMuscu(repetition:number, nombre:number, poids:number, pause:number, idEnt:number, idExe:number) : void {
		this.sqliteDAO.db.executeSql('INSERT INTO `spt_serie` (ser_repetition, ser_nombre, ser_poids, ser_pause, ser_ent_id, ser_exe_id) VALUES (?, ?, ?, ?, ?, ?)', [repetition, nombre, poids, pause, idEnt, idExe])
		.then(() => {console.log("serie Muscu inserted");})
		.catch(e => console.log("error : " + e));
	} // ajouterSerieMuscu

	public ajouterSerieCardio(tempsMin:number, tempsSec:number, distance:number, depense:number, pause:number, idEnt:number, idExe:number) : void {
		this.sqliteDAO.db.executeSql('INSERT INTO `spt_serie` (ser_tempsMin, ser_tempsSec, ser_distance, ser_depense, ser_pause, ser_ent_id, ser_exe_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [tempsMin, tempsSec, distance, depense, pause, idEnt, idExe])
		.then(() => {console.log("serie Cardio inserted");})
		.catch(e => console.log("error : " + e));
	} // ajouterSerieCardio

  
  	public  getSerieExerciceEnt (idEnt:number, idExe:number) {
    	return new Promise ((resolve, reject) => {
	  		let series: Array<Serie> = [];
		    let req = "SELECT ser_id, ser_repetition, ser_nombre, ser_poids, ser_pause, ser_distance, ser_tempsMin, ser_tempsSec, ser_depense, exe_type FROM spt_serie JOIN spt_exercice ON exe_id = ser_exe_id WHERE ser_ent_id = " + idEnt + " AND ser_exe_id = " + idExe + "";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {console.log("pas de données"); reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let ser : Serie;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	ser = new Serie ();
				          	ser.setId(data.rows.item(i).ser_id);
				          	ser.setRepetition(data.rows.item(i).ser_repetition);
				          	ser.setNombre(data.rows.item(i).ser_nombre);
				          	ser.setPoids(data.rows.item(i).ser_poids);
				          	ser.setPause(data.rows.item(i).ser_pause);
				          	ser.setDistance(data.rows.item(i).ser_distance);
				          	ser.setTempsMin(data.rows.item(i).ser_tempsMin);
				          	ser.setTempsSec(data.rows.item(i).ser_tempsSec);
				          	ser.setDepense(data.rows.item(i).ser_depense);
				          	ser.setType(data.rows.item(i).exe_type);
				            series.push(ser);
				      	}
			      		resolve (series);
		        	}
		      	}
		      	resolve (series);
		    });
		});
  	} // getSerieExerciceEnt

  	public deleteSerieFromExercice (idSerie:number) {
	    this.sqliteDAO.db.executeSql('DELETE FROM `spt_serie` WHERE ser_id = ' + idSerie, {})
	    .then(() => { console.log("serie deleted"); })
	    .catch(e => console.log(e));
  	} // deleteSerieFromExercice

  	public  getSeriesExercicesEntrainements (idExe:number) {
    	return new Promise ((resolve, reject) => {
	  		let series: Array<Object> = [];
		    let req = "SELECT ser_poids, ent_date, ser_tempsMin, ser_tempsSec FROM spt_serie JOIN spt_exercice ON ser_exe_id = exe_id JOIN spt_entrainement ON ser_ent_id = ent_id WHERE exe_id = ? ORDER BY ent_date ASC";
		    this.sqliteDAO.db.executeSql(req, [idExe])
		    .then((data) => {
		    	if(data == null) {console.log("pas de données"); reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let ser : Serie;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	
				            series.push({
				            	poids : data.rows.item(i).ser_poids,
				            	date : data.rows.item(i).ent_date,
				            	temps : data.rows.item(i).ser_tempsMin + (data.rows.item(i).ser_tempsSec / data.rows.item(i).ser_tempsMin)
				            });
				      	}
			      		resolve (series);
		        	}
		      	}
		      	resolve (series);
		    });
		});
  	} // getSeriesExercicesEntrainements

  	public  getLastSerieExercice (idExe:number) {
    	return new Promise ((resolve, reject) => {
	  		let ser : Serie;
		    let req = "SELECT ser_repetition, ser_nombre, ser_poids, ser_pause, ser_tempsMin, ser_tempsSec, ser_distance, ser_depense FROM spt_serie WHERE ser_exe_id = ? ORDER BY ser_id DESC LIMIT 1";
		    this.sqliteDAO.db.executeSql(req, [idExe])
		    .then((data) => {
		    	if(data == null) {console.log("pas de données"); reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		ser = new Serie();
		          		ser.setRepetition(Number.parseInt(data.rows.item(0).ser_repetition));
		          		ser.setNombre(Number.parseInt(data.rows.item(0).ser_nombre));
		          		ser.setPoids(Number.parseInt(data.rows.item(0).ser_poids));
		          		ser.setPause(Number.parseInt(data.rows.item(0).ser_pause));
		          		ser.setTempsMin(Number.parseInt(data.rows.item(0).ser_tempsMin));
		          		ser.setTempsSec(Number.parseInt(data.rows.item(0).ser_tempsSec));
		          		ser.setDistance(Number.parseFloat(data.rows.item(0).ser_distance));
		          		ser.setDepense(Number.parseInt(data.rows.item(0).ser_depense));
			      		
			      		resolve (ser);
		        	}
		      	}
		      	reject(null);
		      	//resolve (ser);
		    });
		});
  	} // getSeriesExercicesEntrainements
 
} // SerieDAO


