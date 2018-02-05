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
import { Muscle } from '../../app/domaines/muscle';

@Injectable()
export class MuscleDAO {

	constructor(private sqlite: SQLite, private sqliteDAO: SqliteDAO, private nativeStorage: NativeStorage) {
	} // constructor

	public ajouterMuscle(nom:string, image:string) : void {
		this.sqliteDAO.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', [ nom, image])
		.then(() => {console.log("muscle inserted");})
		.catch(e => console.log("ajouterMuscle() error : " + e));
	} // ajouterMuscle

  
  	public  getMuscles () {
    	return new Promise ((resolve, reject) => {
	  		let muscles: Array<Muscle> = [];
		    let req = "SELECT mus_id, mus_nom, mus_image FROM spt_muscle ORDER BY mus_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let mus : Muscle;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	mus = new Muscle (data.rows.item(i).mus_id, data.rows.item(i).mus_nom, data.rows.item(0).mus_image);
				            muscles.push(mus);
				      	}
			      		resolve (muscles);
		        	}
		      	}
		      	resolve (muscles);
		    });
		});
  	} // getMuscles

	public getMuscle (id:number) {
		return new Promise ((resolve, reject) => {
	  		let muscles: Array<Muscle> = [];
		    let req = "SELECT mus_id, mus_nom, mus_image FROM spt_muscle WHERE mus_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let mus : Muscle;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	mus = new Muscle (data.rows.item(i).mus_id, data.rows.item(i).mus_nom, data.rows.item(0).mus_image);
				            muscles.push(mus);
				      	}
			      		resolve (muscles);
		        	}
		      	}
		      	resolve (muscles);
		    });
		});
	} // getMuscle

	public getExercicesMuscle (id:number) {
		return new Promise ((resolve, reject) => {
	  		let lst: Array<Object> = [];
		    let req = "SELECT mus_id, mus_nom, mus_image, exe_id, exe_nom FROM spt_muscle JOIN spt_exercice ON exe_mus_id = mus_id WHERE mus_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		let mus = new Muscle (data.rows.item(0).mus_id, data.rows.item(0).mus_nom, data.rows.item(0).mus_image);
		    		if(data.rows.length > 0) {
		          		let lstExo = [];
			      		for(var i = 0; i < data.rows.length; i++) {
				            lstExo.push({
				            	id : data.rows.item(i).exe_id,
				            	nom : data.rows.item(i).exe_nom
				            });
				      	}
				      	lst.push({muscle: mus, exercices:lstExo})
			      		resolve (lst);
		        	}
		      	}
		      	resolve (lst);
		    });
		});
	} // getExercicesMuscle

	public getNbExerciceByMuscle () {
		return new Promise ((resolve, reject) => {
	  		let list: Array<Object> = [];
		    let req = "SELECT mus_nom, count(exe_id) as 'nbExe' FROM spt_exercice JOIN spt_muscle ON exe_mus_id = mus_id JOIN spt_contient ON con_exe_id = exe_id WHERE mus_id <> 1 GROUP BY mus_nom ORDER BY mus_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            list.push({
				            	nom : data.rows.item(i).mus_nom,
				            	nbExe : data.rows.item(i).nbExe
				            });
				      	}
			      		resolve (list);
		        	}
		      	}
		      	resolve (list);
		    });
		});
	} // getNbExerciceByMuscle
 
 
} // MuscleDAO


