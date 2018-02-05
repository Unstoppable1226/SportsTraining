//package statistiques

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component, ViewChild  } from '@angular/core';

//ionic-angular
import { NavController } from 'ionic-angular';

//chart
import { Chart } from 'chart.js';

//providers
import { EntrainementDAO } from '../../app/providers/entrainementDAO';
import { MensurationDAO } from '../../app/providers/mensurationDAO';
import { MesureDAO } from '../../app/providers/mesureDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { SerieDAO } from '../../app/providers/serieDAO';
import { MuscleDAO } from '../../app/providers/muscleDAO';

@Component({
	selector: 'statistiquesPage',
	templateUrl: 'statistiquesPage.html'
})
export class StatistiquesPage {  

    private moisComplet = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    private mois = ["Janv", "Fev", "Mars", "Avr", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"];
    private donnees;
    private state:number; //1 pour bar, 2 pour doughnut, 3 pour line
    private labels;
    private data;
    private graphSelection:number;
    private mensurationState:boolean;
    private mensurationIdSelection:number;
    private mensurations;
    private exercices;
    private exeMuscuIdSelection;
    private exeCardioIdSelection;
 	 
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;
 
    constructor(private navCtrl: NavController, private entrainementDAO:EntrainementDAO, private mensurationDAO:MensurationDAO, 
        private mesureDAO:MesureDAO, private exerciceDAO:ExerciceDAO, private serieDAO:SerieDAO, private muscleDAO:MuscleDAO) {
        this.graphSelection = 1;
        this.afficherNbEntrainements ()  
    } // constructor

    private afficherNbEntrainements () {
        this.mensurationIdSelection = 0;
        this.exeMuscuIdSelection = 0;
        this.exeCardioIdSelection = 0;
        this.state = 1;
        this.entrainementDAO.getNbEntByMonth ().then ((resolve) => {
            this.donnees = resolve;
            this.labels = [];
            this.data = [];
            for (let i=0; i < this.donnees.length; i++) {
                this.labels.push(this.mois[this.donnees[i].mois-1]);
                this.data.push(this.donnees[i].nbEnt);
            }
            this.initChartBar(this.labels, this.data, 'Nombre d\'entrainements')
        })
    } // afficherNbEntrainements

    private afficherMensurations () {
        this.exeMuscuIdSelection = 0;
        this.exeCardioIdSelection = 0;
        this.state = 0;
        this.mensurationDAO.getMensurationsWithMesure ().then ((resolve) => {
            this.mensurations = resolve;
        })
    } // afficherMensurations

    private test(id) {
        console.log("test : " + id)
    }

    private afficherGraphMensuration (idMen:number) {
        this.state = 3;
        this.mesureDAO.getMesuresMensuration (idMen).then ((resolve) => {
            this.donnees = resolve;
            this.labels = [];
            this.data = [];

            for (let i=0; i < this.donnees.length; i++) {
                this.labels.push(this.donnees[i].date);
                this.data.push(this.donnees[i].mesure);
            }

            this.initLineChart(this.labels, this.data, "Mensurations par jour");
        })
        
    } // afficherGraphMensuration

    private afficherExercicesMuscu () {
        this.mensurationIdSelection = 0;
        this.exeCardioIdSelection = 0;
        this.state = 0;
        this.exerciceDAO.getExercicesMuscuEntrainementsSeries ().then ((resolve) => {
            this.exercices = resolve;
        })
    } // afficherExercicesMuscu

    private afficherGraphExerciceMuscu () {
        this.state = 3;
        this.serieDAO.getSeriesExercicesEntrainements (this.exeMuscuIdSelection).then ((resolve) => {
            this.donnees = resolve;
            this.labels = [];
            this.data = [];

            for (let i=0; i < this.donnees.length; i++) {
                this.labels.push(this.donnees[i].date);
                this.data.push(this.donnees[i].poids);
            };
            
        })
        .then (()=>{
        	this.initLineChart(this.labels, this.data, "Poids portés par série");
        })
    } // afficherGraphExerciceMuscu

    private afficherExercicesCardio () {
        this.mensurationIdSelection = 0;
        this.exeMuscuIdSelection = 0;
        this.state = 0;
        this.exerciceDAO.getExercicesCardioEntrainementsSeries ().then ((resolve) => {
            this.exercices = resolve;
        })
    } // afficherExercicesCardio

    private afficherGraphExerciceCardio () {
        this.state = 3;
        this.serieDAO.getSeriesExercicesEntrainements (this.exeCardioIdSelection). then ((resolve) => {
            this.donnees = resolve;
            this.labels = [];
            this.data = [];

            for (let i=0; i < this.donnees.length; i++) {
                this.labels.push(this.donnees[i].date);
                this.data.push(this.donnees[i].temps);
            }

        })
        .then (()=>{
        	this.initLineChart(this.labels, this.data, "Temps d'utilisation en minutes");
        })
    } // afficherGraphExerciceCardio


    private afficherMuscles () {
        this.mensurationIdSelection = 0;
        this.exeMuscuIdSelection = 0;
        this.exeCardioIdSelection = 0;
        this.state = 2;
        this.muscleDAO.getNbExerciceByMuscle ().then ((resolve) => {
            this.donnees = resolve;
            this.labels = [];
            this.data = [];

            for (let i=0; i < this.donnees.length; i++) {
                this.labels.push(this.donnees[i].nom);
                this.data.push(this.donnees[i].nbExe);
            }
             
        })
         .then (()=>{
        	this.initDoughnutChart(this.labels, this.data, 'Muscles utilisés')
        })
    } // afficherMuscles

    private initChartBar(labels, data, label:string) {

        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
        
    } // initChartBar

    private initLineChart (labels, data, label:string) {

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data,
                        spanGaps: false,
                    }
                ]
            }
 
        });

    } // initLineChart

    private initDoughnutChart(labels, data, label:string) {
 
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                         "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                         "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });
 
    } // initDoughnutChart 
 
} // StatistiquesPage
