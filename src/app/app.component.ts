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
  description: string | undefined;

  constructor(private pokeApiService: PokeApiService) {
    this.pokeApiService.getPokemon('pikachu').subscribe(data => {
      this.pokemon = data;
    });

    this.pokeApiService.getDescription('pikachu').subscribe(data => {
      const flavorTextEntries = data.flavor_text_entries;
      const englishFlavorTextEntries = flavorTextEntries.filter((entry: { language: { name: string; }; }) => entry.language.name === 'en');
      this.description = englishFlavorTextEntries[0].flavor_text;
    });
  }
}
