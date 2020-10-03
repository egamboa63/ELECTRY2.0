import { Component, OnInit } from "@angular/core";

/*SERVICIOS*/
import { ElectryService } from "../../../services/electry.service";
import { AppComponent } from "../../../app.component";

/*ANGULARFIRESTORE*/
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-informacion",
  templateUrl: "./informacion.component.html",
  styleUrls: ["./informacion.component.scss"],
})
export class InformacionComponent implements OnInit {
  nombre = "";
  estado = "";
  vidautil = "";
  capacidad = "";
  cambiarinformacion(nombre, vidautil, capacidad) {
    this.nombre = nombre;
    this.vidautil = vidautil;
    this.capacidad = capacidad;
  }
  cambiarinformacion2(estado) {
    this.estado = estado;
  }

  constructor(
    public productService: ElectryService,
    public db: AngularFirestore,
    public appcomponent: AppComponent
  ) {}

  ngOnInit(): void {
    //LLENANDO INFO ESTADO
    this.productService.getEstados().subscribe((prueba) => {
      this.cambiarinformacion2(prueba[prueba.length - 1].ESTADO);
    });
    //LLENANDO INFO PLANTA
    this.productService.getPlantas().subscribe((planta) => {
      this.cambiarinformacion(
        planta[0].NOMBRE,
        planta[0].VIDAUTIL,
        planta[0].CAPACIDAD
      );
    });
  }
}
