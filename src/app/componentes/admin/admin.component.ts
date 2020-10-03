import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

/*SERVICIOS*/
import { ElectryService } from "../../services/electry.service";
import { AppComponent } from "../../app.component";

/*ANGULARFIRESTORE*/
import { AngularFirestore } from "@angular/fire/firestore";



@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  
  //INICIO GRAFICA PIE TIEMPOS PORMEDIO DE ESTADO
  /*
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['A1 = 500', 'A2 = 500','A3 = 500'];
  public pieChartData: SingleDataSet = [500, 500, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  */
  //FIN GRAFICA PIE TIEMPOS PORMEDIO DE ESTADO

  //VALORES

  constructor(
    public productService: ElectryService,
    public db: AngularFirestore,
    public appcomponent: AppComponent,
    private router: Router
  ) {}

  ngOnInit(): void {

  }
  toVisualizacion(){
    this.router.navigate(['/pdf']);
    
  }
}
