import { Component, OnInit } from "@angular/core";

/*SERVICIOS*/
import { ElectryService } from "../../../services/electry.service";
import { AppComponent } from "../../../app.component";

/*ANGULARFIRESTORE*/
import { AngularFirestore } from "@angular/fire/firestore";

/*MOMENT*/
import * as moment from "moment";

/*ng2*/
import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-demanda",
  templateUrl: "./demanda.component.html",
  styleUrls: ["./demanda.component.scss"],
})
export class DemandaComponent implements OnInit {
  //GRAFICADEMANDA
  valores = [];
  n = [];

  //INICIO GRAFICA DEMANDA
  public lineChartData: ChartDataSets[] = [
    { data: this.valores, label: "Demanda GW X MINUTO" },
  ];
  public lineChartLabels: Label[] = this.n;
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(255,0,0,0.3)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
  //FIN GRAFICA DEMANDA

  constructor(
    public productService: ElectryService,
    public db: AngularFirestore,
    public appcomponent: AppComponent
  ) {}

  ngOnInit(): void {
    //LLENADO DE INFO DEMANDA
    //EN EL METODO GETDEMANDA SEGUN EL PAIS
    this.productService.getDemandaUltimosN().subscribe((products) => {
      let tiempo = new Date();
      if (products.length > 0) {
        if (this.valores.length > 0) {
          for (let index = 0; index < products.length - 1; index++) {
            this.valores.pop();
            this.valores.push(products[index].DEMANDA);
            this.n.pop();
            tiempo = moment(products[index].FECHA).toDate();
            this.n.push(moment(tiempo).format("LT"));
          }
          tiempo = moment(products[products.length - 1].FECHA).toDate();
          this.valores.push(products[products.length - 1].DEMANDA);
          this.n.push(moment(tiempo).format("LT"));
        } else {
          for (let index = 0; index < products.length; index++) {
            this.valores.push(products[index].DEMANDA);
            tiempo = moment(products[index].FECHA).toDate();
            this.n.push(moment(tiempo).format("LT"));
          }
        }
      } else {
        this.valores.push(products[0].DEMANDA);
        tiempo = moment(products[0].FECHA).toDate();
        this.n.push(moment(tiempo).format("LT"));
      }
    });
  }
}
