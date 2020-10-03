import { Component, OnInit } from "@angular/core";

/*SERVICIOS*/
import { ElectryService } from "../../../services/electry.service";
import { AppComponent } from "../../../app.component";

/*ANGULARFIRESTORE*/
import { AngularFirestore } from "@angular/fire/firestore";

/*MOMENT*/
import * as moment from "moment";

/*ng2*/
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-produccion",
  templateUrl: "./produccion.component.html",
  styleUrls: ["./produccion.component.scss"],
})
export class ProduccionComponent implements OnInit {
  //GRAFICAPRODUCCION
  datavalor2 = [];
  fechavalor2 = [];

  //INICIO GRAFICA GW GENERADOS
  public barChartOptions2: ChartOptions = {
    responsive: true,
  };
  public barChartLabels2: Label[] = this.fechavalor2;
  public barChartType2: ChartType = "bar";
  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  public barChartData2: ChartDataSets[] = [
    { data: this.datavalor2, label: "GW GENERADOS 24 H" },
  ];
  //FIN GRAFICA GW GENERADOS

  constructor(
    public productService: ElectryService,
    public db: AngularFirestore,
    public appcomponent: AppComponent
  ) {}

  ngOnInit(): void {
    //LLENANDO INFO PRODUCCION
    this.productService.getProduccion().subscribe((valor) => {
      let tiempo = new Date();
      if (valor.length > 0) {
        if (this.datavalor2.length > 0) {
          for (let index = 0; index < valor.length - 1; index++) {
            this.datavalor2.pop();
            this.datavalor2.push(valor[index].PRODUCCION);
            this.fechavalor2.pop();
            tiempo = moment(valor[index].FECHA).toDate();
            this.fechavalor2.push(moment(tiempo).fromNow());
          }
          tiempo = moment(valor[valor.length - 1].FECHA).toDate();
          this.datavalor2.push(valor[valor.length - 1].PRODUCCION);
          this.fechavalor2.push(moment(tiempo).fromNow());
        } else {
          for (let index = 0; index < valor.length; index++) {
            this.datavalor2.push(valor[index].PRODUCCION);
            tiempo = moment(valor[index].FECHA).toDate();
            this.fechavalor2.push(moment(tiempo).fromNow());
          }
        }
      } else {
        this.datavalor2.push(valor[0].PRODUCCION);
        tiempo = moment(valor[0].FECHA).toDate();
        this.fechavalor2.push(moment(tiempo).fromNow());
      }
    });
  }
}
