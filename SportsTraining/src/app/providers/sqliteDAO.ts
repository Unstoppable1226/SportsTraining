/*
  Class  : SqliteDAO
  Auteur : Vincent Jalley
  Date   : 27.08.2017
  Sports Training Version 1
  Description : Permet de créer les tables pour le stockage des données,
                + Insertion des données de base au fonctionnement de l'application,
                Ainsi que d'initialiser la variable db pour communiquer avec la base de données Sqlite.
                
*/import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

//Constantes
const DATABASE_FILE_NAME: string = 'data.db';
const INSERTED_DATA: string = 'INSERTED_DATA';


@Injectable()
export class SqliteDAO {

  public db : SQLiteObject;

  constructor(private sqlite: SQLite, private nativeStorage: NativeStorage) {

  } // constructor

  public  getDb () : SQLiteObject { return Object.assign({}, this.db); } // getDb

  public createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.CreateStructureData();
      })
      .catch(e => console.log(e));
  } // createDatabaseFile

  private  CreateStructureData () : void {
    this.nativeStorage.getItem(INSERTED_DATA)
    .then(
      data => {
        //console.log("ok")
        //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Curl avant-bras avec haltères", "muscu", "Cet exercice est très efficace pour se muscler les avant-bras. La flexion ou curl poignets avec haltères est un exercice pour la musculation pour les avant-bras. Des avant-bras musclés sont importants dans les exercices au cours desquelles vous saisissez une barre, un haltère ou la poignée d’une machine.", 1, 3])
      },
      error => {
        //on crée le storage qui va contenir une valeur pour n'insérer qu'une seule fois les données !
        this.nativeStorage.setItem(INSERTED_DATA, true)
        .then(() => {
          Promise.all([
            this.createTables(),
            this.insertMuscles(),
            this.insertExercices(),
            this.insertAppreciations(),
            this.insertUtilisateur(),
            this.insertMensurations(),
            this.insertSucces(),
            this.insertDataTest()
          ])      
          .then(() => {/*Tables created + data inserted*/ });
        },
        error => console.error('Error storing INSERTED_DATA', error)
        );
      }
    );
    
  } // CreateStructureData

  //Création des tables pour stocker les données dans Sqlite !
  private createTables(): void {
    //Promise.all permet d'exécuter toutes les promeses séquentiellement une fois chaque terminée ! synchrone !
    Promise.all([
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `spt_appreciation` ( `app_id` INTEGER PRIMARY KEY AUTOINCREMENT, `app_nom` TEXT )', {}), 
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_muscle" ( `mus_id` INTEGER PRIMARY KEY AUTOINCREMENT, `mus_nom` TEXT, `mus_image` TEXT )', {}),
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_exercice" ( `exe_id` INTEGER PRIMARY KEY AUTOINCREMENT, `exe_nom` TEXT, `exe_description` INTEGER, `exe_type` INTEGER, `exe_pause` INTEGER, `exe_image` TEXT, `exe_app_id` INTEGER, `exe_mus_id` INTEGER )', {}),
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_utilisateur" ( `uti_id` INTEGER PRIMARY KEY AUTOINCREMENT, `uti_nom` TEXT, `uti_prenom` TEXT, `uti_dateNais` TEXT, `uti_experience` INTEGER )', {}),      
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `spt_succes` ( `suc_id` INTEGER PRIMARY KEY AUTOINCREMENT, `suc_nom` TEXT, `suc_experience` INTEGER, `suc_image` TEXT )', {}),      
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `spt_debloque` ( `deb_uti_id` INTEGER, `deb_suc_id` INTEGER, FOREIGN KEY(`deb_uti_id`) REFERENCES uti_id, FOREIGN KEY(`deb_suc_id`) REFERENCES suc_id )', {}),      
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_mensuration" ( `men_id` INTEGER PRIMARY KEY AUTOINCREMENT, `men_nom` TEXT, `men_unite` TEXT )', {}),
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_mesure" ( `mes_id` INTEGER PRIMARY KEY AUTOINCREMENT, `mes_date` TEXT, `mes_mesure` INTEGER, `mes_uti_id` INTEGER, `mes_men_id` INTEGER, FOREIGN KEY(`mes_uti_id`) REFERENCES `uti_id`, FOREIGN KEY(`mes_men_id`) REFERENCES `men_id` )', {}),      
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_entrainement" ( `ent_id` INTEGER PRIMARY KEY AUTOINCREMENT, `ent_nom` TEXT, `ent_date` TEXT, `ent_duree` INTEGER, `ent_app_id` INTEGER, `ent_uti_id` INTEGER, FOREIGN KEY(`ent_app_id`) REFERENCES `app_id`, FOREIGN KEY(`ent_uti_id`) REFERENCES uti_id )', {}),
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_contient" ( `con_ent_id` INTEGER, `con_exe_id` INTEGER, FOREIGN KEY(`con_ent_id`) REFERENCES `ent_id`, FOREIGN KEY(`con_exe_id`) REFERENCES `exe_id` )', {}),
      this.db.executeSql('CREATE TABLE IF NOT EXISTS "spt_serie" ( `ser_id` INTEGER PRIMARY KEY AUTOINCREMENT, `ser_repetition` INTEGER, `ser_nombre` INTEGER, `ser_poids` TEXT, `ser_pause` INTEGER, `ser_tempsMin`  INTEGER, `ser_tempsSec`  INTEGER, `ser_distance` INTEGER, `ser_depense` INTEGER, `ser_ent_id` INTEGER, `ser_exe_id` INTEGER, FOREIGN KEY(`ser_ent_id`) REFERENCES `ent_id`, FOREIGN KEY(`ser_exe_id`) REFERENCES `exe_id` )', {})
    ])
    .then(() => {});
  } // createTables

  private insertMuscles() : void {
    Promise.all([
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Autres", "1.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Abdominaux", "2.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Avant-bras", "3.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Biceps", "4.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Dos", "5.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Epaules", "6.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Ischios-jambiers", "7.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Mollets", "8.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Pectoraux", "9.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Quadriceps", "10.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Trapèzes", "11.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Triceps", "12.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Jambes", "13.jpg"]),
      this.db.executeSql('INSERT INTO `spt_muscle` (mus_nom, mus_image) VALUES (?, ?)', ["Bas du Dos", "14.jpg"])
    ])
    .then(() => { });
  } // insertMuscles 

  private insertExercices() : void {
    Promise.all([
      //Exercice Cardio - Autres(1)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Vélo", "21", "Pas de description", 0, 1]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Vélo assis", "22", "Pas de description", 0, 1]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Tapis de course", "24", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Synchro ", "23", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Step ", "25", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Marche ", "24", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Course à pied", "24", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Natation", "26", "Pas de description", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Gainage", "27", "Les exercices de gainages pour les abdominaux vous permettront de renforcer votre sangle abdominale et d'améliorer sa tonicité. Si vous êtes à la recherche d'un ventre plat, le gainage sera votre ami pour éviter d'avoir un ventre trop relâché.", 0, 1]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Rameur", "cardio", "no description", 0, 1]),

      
      //Abdo (2)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Crunch", "muscu", "Le crunch est le mouvement de base pour se muscler les abdominaux sans matériel. Vous pouvez aussi travailler les obliques avec le crunch avec rotation. Si vous avez un banc de musculation, vous pourrez ajouter d'autres variantes à vos entraînements comme le crunch décliné au banc ou le crunch incliné au banc.", 1, 2]),
      // this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Crunch à la poulie", "muscu", "Les poulies sont d'une efficacité redoutable pour travailler la sangle abdominale. Le faite qu'elles appliquent une tension continue sur les muscles tout au long du mouvement permet à ces derniers de les travailler sans relâche, et de leur infliger des sensations extrêmes.", 1, 2]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Relevés de jambes", "muscu", "Le relevé de jambes tendus est un exercice simple. Cet exercice permet de bien solliciter la partie inférieure des abdominaux qui est souvent moins bien musclé.", 1, 2]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Flexions latérales", "muscu", "Cet exercice simple à exécuter vous permettra de travailler les muscles de la sangle abdominale (abdos et obliques) et les muscles extenseurs de la colonne vertébrale.", 1, 2]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Rotation du buste avec bâton", "muscu", "Les rotations du bustes debout ou assis sont un excellent mouvement qui vous permettra d'affiner la taille avec un entraînement en séries longues et une charge légère.", 1, 2]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Abdominal Crunch", "17", "Le banc Abdominal Crunch a été spécialement étudié pour solliciter les abdominaux et offrir un entraînement efficace et sécurisé", 1, 2]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Rotary Torso", "18", "C'est un équipement idéal pour travailler les muscles obliques internes et externes", 1, 2]),
      
      //Avant-bras (3)
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Curl avant-bras avec haltères", "muscu", "Cet exercice est très efficace pour se muscler les avant-bras. La flexion ou curl poignets avec haltères est un exercice pour la musculation pour les avant-bras. Des avant-bras musclés sont importants dans les exercices au cours desquelles vous saisissez une barre, un haltère ou la poignée d’une machine.", 1, 3]),
      
      //Biceps (4)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Curls à la barre", "muscu", "La barre est l'accessoire indispensable pour soulever des charges lourdes avec les biceps. L'exercice numéro 1 est indiscutablement le curl barre en supination que vous pouvez aussi faire en en pronation. Cette variante sollicite davantage le brachial antérieur. Pour isoler et matraquer vos biceps comme il se doit, le curl au pupitre sera votre ami.", 1, 4]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Arm Curl", "12", "Entraînement spécifique des biceps", 1, 4]),
      
      //Dos (5)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Tractions", "muscu", "Les tractions à la barre avec les mains en pronations sont généralement plus difficile à exécuter du fait de l’intervention moins importante des biceps. Cela en fait un mouvement de référence pour se muscler et élargir le dos, surtout si vous vous entraîner avec une prise large. L'avantage de cet exercice est que vous pouvez le réaliser un peu partout si vous avez une barre de traction.", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Soulevé de terre", "muscu", "Le soulevé de terre est un des meilleurs exercices de musculation. Il sollicite de très nombreux groupes musculaires, principalement ceux du dos, des fessiers et des ischios. Il vous permettra de soulever des charges lourdes en toute sécurité, à condition de respecter une bonne technique.", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Elévations latérales", "muscu", "Les élévations latérales sont très efficace pour se muscler les muscles des l'épaules. Il existe de nombreuses variantes, les deux plus connues étant les élévations latérales avec haltères et les élévations latérales à la poulie basse qui permettent de profiter d'une tension continue.", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Elévations frontales", "muscu", "Les élévations frontales permettent de cibler la partie antérieure des deltoïdes. Vous pouvez réaliser cet exercice de manière unilatérale avec un seul haltère ou comme pour les élévations latérales : à la poulie pour stimuler vos muscles différemment et avoir d'autres sensations.", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Elévations buste penché", "muscu", "Cet exercice est optimal pour muscler l'arrière des épaules. Les élévations buste penché avec haltères permettent de cibler l'arrière du muscle deltoïde avec une très grande précision à condition d'avoir la bonne trajectoire et d'avoir une technique d'exécution correcte.", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Tirage menton", "muscu", "Le tirage menton à la barre est un exercice qui permet de se muscler les épaules et les trapèzes supérieurs. Il peut être effectué avec une barre libre ou guidée.", 1, 5]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Vertical Traction", "1", "Entraînement spécifique des muscles du grand dorsal et des biceps", 1, 5]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Low Row", "4", "Entraînement spécifique des muscles du tronc et du dos", 1, 5]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Lat Machine", "9", "Entraînement spécifique des muscles du grand dorsal", 1, 5]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Pulley", "16", "La machine Pulley a été spécialement étudié pour renforcer les muscles dorsaux et les biceps", 1, 5]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Upper Back", "20", "L'équipement Upper Back permet de renforcer les muscles posturaux, en particulier les deltoïdes postérieurs et les rhomboïdes du tronc et de la région scapulaire", 1, 5]),
      
      //Epaules (6)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Shoulder Press", "2", "Entraînement des muscles des épaules", 1, 6]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Delts Machine", "19", "L'équipement Delts Machine a été spécialement étudié pour solliciter les muscles deltoïdes et les muscles des bras", 1, 6]),

      //Ischios-jambier (7)
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Soulevé de terre", "muscu", "Cet exercice est très efficace pour solliciter les muscles fessiers (glutéal) et ischios jambiers. Une excellente technique et de la souplesse sont nécessaire pour faire le mouvement.", 1, 7]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Leg Curl", "8", "Entraînement spécifique des muscles arrière des cuisses et amélioration du tonus musculaire et de l'efficacité des jambes", 1, 7]),
      
      //Mollets (8)
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Mollets à la presse à cuisses", "muscu", "En bodybuilding, les exercices de mollets augmentent la masse et la définition de la partie supéro-postérieure et des parties latérales de la jambe. L'exercice pour les mollets à la presse à cuisses est un excellent mouvement pour atteindre cet objectif.", 1, 8]),
     
      //Pectoraux (9)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Dips", "28", "C'est l'exercice de référence pour travailler les triceps et les pectoraux au poids de corps avec des barres parallèles. Les dips pour les pectoraux se réalisent avec le buste incliné en avant. Si vous êtes à l'aise et que vous arrivez à faire plus d'une vingtaine de répétitions, n'hésitez pas à rajouter du lest pour augmenter votre force.", 1, 9]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Développé couché", "muscu", "Le développé couché aussi appelé bench press est un des trois mouvements du powerlifting. C'est l'exercice roi pour les pectoraux. Le développé couché à la barre permet de soulever des charges lourdes. Le développé couché avec haltères permet de travailler sur une grande amplitude avec une charge égale sur chaque muscle grand pectoral.", 1, 9]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Développé incliné", "muscu", "La version inclinée du développé pour les pectoraux permet de cibler la partie haute des muscles de la poitrine. Comme avec la version couché, le développé incliné à la barre permet de prendre lourd et le développé incliné avec haltères vous permettra de travailler sur une amplitude plus importante.", 1, 9]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Développé décliné", "muscu", "Cet exercice est très efficace pour travailler le bas de la poitrine. Les fibres inférieures des pectoraux étant plus puissantes, vous pourrez soulever de lourdes charges.", 1, 9]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Pompes", "muscu", "Avec toutes les machines et mouvements pour les pectoraux, les pompes, ou push-ups sont devenues un exercice un peu oublié. C'est pourtant un excellent exercice car vous pouvez facilement accentuer le travail sur une zone des pectoraux en variant l'écartement ou l'inclinaison.", 1, 9]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Pectoral", "3", "Entraînement spécifique des pectoraux", 1, 9]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Chest Press", "10", "Entraînement spécifique des pectoraux", 1, 9]),
      
      //Quadriceps (10)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Leg Extension", "7", "Entraînement spécifique des quadriceps et amélioration du tonus musculaire et de l'efficacité des jambes", 1, 10]),

      //Trapèze (11)
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Shrug", "muscu", "Le shrug ou rowing debout est probablement l’un des exercices les plus populaires utilisés par les pratiquants de la musculation pour développer la partie supérieure des trapèzes.", 1, 11]),

      //triceps (12)
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Arm Extension", "11", "Entraînement spécifique des triceps", 1, 12]),

      //jambes (13) 
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Leg Press", "5", "Entraînement de toutes les chaînes de muscles des jambes", 1, 13]),
      //this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Multi Hip", "13", "Entraînement spécifique de tous les muscles des hanches et de la zone pelvienne et prévention et traitement des problèmes articulatoires et musculaires de la zone pelvienne et des hanches.", 1, 13]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Adductor", "14", "Entraînement spécifique des adducteurs et amélioration du tonus musculaire et de l'efficacité des jambes", 1, 13]),
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Abductor", "15", "Entraînement spécifique des abducteurs et amélioration du tonus musculaire et de l'efficacité des jambes", 1, 13]),

      //bas du dos (14) 
      this.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_image, exe_description, exe_type, exe_mus_id) VALUES (?, ?, ?, ?, ?)', ["Lower Back", "6", "Entraînement spécifique des muscles du bas du dos", 1, 14])

    ])
    .then(() => {});
  } // insertExercices

  private insertAppreciations () {
    Promise.all([
      this.db.executeSql('INSERT INTO `spt_appreciation` (app_nom) VALUES ("Pas défini")', {}),
      this.db.executeSql('INSERT INTO `spt_appreciation` (app_nom) VALUES ("Facile")', {}),
      this.db.executeSql('INSERT INTO `spt_appreciation` (app_nom) VALUES ("Normal")', {}),
      this.db.executeSql('INSERT INTO `spt_appreciation` (app_nom) VALUES ("Difficile")', {})
    ])
    .then(() => { });  
  } // insertAppreciations

  private insertUtilisateur() {
    Promise.all([
      this.db.executeSql('INSERT INTO `spt_utilisateur` (uti_nom, uti_prenom, uti_dateNais, uti_experience) VALUES (?, ?, ?, ?)', [ "Jalley", "Vincent", "1992-05-09", 0])
    ])
    .then(() => { });  
  } // insertUtilisateur

  private insertMensurations () {
    Promise.all([
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Taille", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Poids", "kg"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Epaules", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Poitrine", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Tour de taille", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Cuisse gauche", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Cuisse droite", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Cou", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Bras gauche", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Bras droit", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Mollet gauche", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Mollet droit", "cm"]),
      this.db.executeSql('INSERT INTO `spt_mensuration` (men_nom, men_unite) VALUES (?, ?)', [ "Taux masse grasse", "%"])

    ])
    .then(() => { });  
  } // insertMensurations

  private insertSucces() {
    Promise.all([
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Bienvenue", 0, "1.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Novice", 150, "2.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Régulier", 300, "3.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Sportif Amateur", 750, "4.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Challenger", 1000, "5.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Sherif Sportif", 1500, "6.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Sportif D'Élite", 2000, "7.png" ]),
      this.db.executeSql('INSERT INTO `spt_succes` (suc_nom, suc_experience, suc_image) VALUES (?, ?, ?)', [ "Grenadier", 3000, "8.png" ])
    ])
    .then(() => {});  
  } // insertSucces

  private insertDataTest () {
    /*Promise.all([
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-09-09", 75.5, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-08-08", 76, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-07-07", 76.5, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-06-06", 77, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-05-05", 78, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-04-04", 80, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-03-03", 79, 1, 2 ]),
      this.db.executeSql('INSERT INTO `spt_mesure` (mes_date, mes_mesure, mes_uti_id, mes_men_id) VALUES (?, ?, ?, ?)', [ "2017-02-02", 75, 1, 2 ])
    ])*/
  } // insertDataTest

} // SqliteDAO
