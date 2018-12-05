import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { GameSetupComponent } from './components/setup/game-setup.component';
import { ChickenGameComponent } from './components/chicken-game/chicken-game.component';
import { BalloonGameComponent } from './components/balloon-game/balloon-game.component';
import { CircularMotionParticlesComponent } from './components/circular-motion-particles/circular-motion-particles.component';

const routes: Routes = [
  { path: "", component: GameSetupComponent },
  { path: 'snakegame', component: GameComponent },
  { path: 'chickengame', component: ChickenGameComponent},
  { path: 'balloonGame', component: BalloonGameComponent},
  { path: 'circularParticle', component: CircularMotionParticlesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
