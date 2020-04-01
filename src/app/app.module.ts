import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

const materialModules = [
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule
];

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BallComponent } from './components/ball/ball.component';
import { HomeComponent } from './pages/home/home.component';
import { services } from './services';
import { HealthComponent } from './components/health/health.component';
import { HealthStatusComponent } from './components/health-status/health-status.component';
import { DistributionComponent } from './components/distribution/distribution.component';
import { PageHeaderComponent } from './components/page/page-header/page-header.component';
import { PageFooterComponent } from './components/page/page-footer/page-footer.component';
import { PageLayoutComponent } from './components/page/page-layout/page-layout.component';
import { CovidIconComponent } from './components/icons/covid-icon/covid-icon.component';


@NgModule({
  declarations: [
    AppComponent,
    BallComponent,
    HomeComponent,
    HealthComponent,
    HealthStatusComponent,
    DistributionComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageLayoutComponent,
    CovidIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    materialModules
  ],
  providers: [
    services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
