import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent{
  
  public title: string;
  
  constructor() { 
    this.title = 'Newstein Games';
  }

}
