import { Component, OnInit } from '@angular/core';

/*SERVICIOS*/
import { ElectryService } from "../../../services/electry.service";
import { AppComponent } from "../../../app.component";

/*ANGULARFIRESTORE*/
import { AngularFirestore } from "@angular/fire/firestore";

/*MOMENT*/
import * as moment from "moment";

/*ng2*/
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit {

    //GRAFICA VALORES
    datavalor = [];
    fechavalor = [];

  //INICIO GRAFICA VALOR GW
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.fechavalor;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.datavalor, label: 'VALOR GW 24 H' }
  ];
  //FIN GRAFICA VALOR GW

  constructor(public productService: ElectryService,public db: AngularFirestore,public appcomponent:AppComponent) { }

  ngOnInit(): void {
        //LLENANDO INFO VALOR
        this.productService.getValor().subscribe((valor)=>{   
          let tiempo = new Date();
          if (valor.length > 0) {
            if (this.datavalor.length > 0) {
              for (let index = 0; index < valor.length - 1; index++) {
                this.datavalor.pop();
                this.datavalor.push(valor[index].VALOR);
                this.fechavalor.pop();
                tiempo = moment(valor[index].FECHA).toDate();
                this.fechavalor.push(moment(tiempo).fromNow());
              }
              tiempo = moment(valor[valor.length - 1].FECHA).toDate();
              this.datavalor.push(valor[valor.length - 1].VALOR);
              this.fechavalor.push(moment(tiempo).fromNow());
            } else {
              for (let index = 0; index < valor.length; index++) {
                this.datavalor.push(valor[index].VALOR);
                tiempo = moment(valor[index].FECHA).toDate();
                this.fechavalor.push(moment(tiempo).fromNow());
              }
            }
          } else {
            this.datavalor.push(valor[0].VALOR);
            tiempo = moment(valor[0].FECHA).toDate();
            this.fechavalor.push(moment(tiempo).fromNow());
          }   
        });
  }

}
