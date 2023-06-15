import { NgModule } from '@angular/core';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FilterPipe } from "./team/instPipe"

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { ConsortiumComponent } from './consortium/consortium.component';
import { TeamComponent } from './team/team.component';
import { ResearchPublicationsComponent } from './research-publications/research-publications.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ConsortiumComponent,
    TeamComponent,
    ResearchPublicationsComponent,
    ContactComponent,
    PageNotFoundComponent,
    BackdropComponent,
    FooterComponent,
    FilterPipe,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        NgxPageScrollCoreModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
