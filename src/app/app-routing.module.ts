import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { UserComponent } from "./user/user.component";


const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: FormComponent },
  { path: 'Users/:id', component: UserComponent },
  {path:'**', component:NotfoundComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})



export class AppRoutingModule {

}
