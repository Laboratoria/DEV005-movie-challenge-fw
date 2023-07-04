import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './modules/movie/movie.component';
import { MovieDetailComponent } from './modules/movie/movie-detail/movie-detail.component';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './pipe/order-by.pipe';
import { DetailComponent } from './modules/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDetailComponent,
    OrderByPipe,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
