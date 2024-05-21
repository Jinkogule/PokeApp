import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from './services/poke-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  providers: [ HttpClient, PokeApiService ],
  standalone: true
})
export class AppComponent {
  pokemon: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokeApiService.getPokemon('chandelure').subscribe(data => {
      this.pokemon = data;
    });
  }
}
