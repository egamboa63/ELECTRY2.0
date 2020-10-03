import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminComponent } from './componentes/admin/admin.component';

//FIREBASE
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

//NG2-CHARTS
import { ChartsModule } from "ng2-charts";
import { SingupComponent } from './componentes/singup/singup.component';

//REACTIVE MODULE
import { ReactiveFormsModule } from "@angular/forms";
import { DemandaComponent } from './componentes/admin/demanda/demanda.component';
import { ValorComponent } from './componentes/admin/valor/valor.component';
import { ProduccionComponent } from './componentes/admin/produccion/produccion.component';
import { InformeComponent } from './componentes/admin/informe/informe.component';
import { InformacionComponent } from './componentes/admin/informacion/informacion.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    SingupComponent,
    DemandaComponent,
    ValorComponent,
    ProduccionComponent,
    InformeComponent,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChartsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
