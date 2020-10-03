import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*RUTAS DE LAS VISTAS*/
import { HomeComponent } from "./componentes/home/home.component";
import { LoginComponent } from "./componentes/login/login.component";
import { AdminComponent } from "./componentes/admin/admin.component";
import { SingupComponent } from "./componentes/singup/singup.component";
import { InformeComponent } from "./componentes/admin/informe/informe.component";

const routes: Routes = [
  {path:'',component:HomeComponent,},
  {path:'login',component:LoginComponent,},
  {path:'admin',component:AdminComponent,},
  {path:'singup',component:SingupComponent,},
  {path:'pdf',component:InformeComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
