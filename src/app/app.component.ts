import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from './services/poke-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule],
  providers: [ HttpClient, PokeApiService ],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppComponent {
  pokemon: any;

  constructor(private pokeApiService: PokeApiService) {
    this.pokeApiService.getPokemon('chandelure').subscribe(data => {
      this.pokemon = data;
    });
  }
}
