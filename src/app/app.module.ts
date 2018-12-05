import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './components/appComponent/app.component';
import { GameComponent } from './components/game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { GameSetupComponent } from './components/setup/game-setup.component';
import { ChickenGameComponent } from './components/chicken-game/chicken-game.component';
import { HttpClientModule } from '@angular/common/http';
import { BalloonGameComponent } from './components/balloon-game/balloon-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameSetupComponent,
    ChickenGameComponent,
    BalloonGameComponent

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
export class AppModule { }
