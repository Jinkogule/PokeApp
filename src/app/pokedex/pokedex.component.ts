import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  providers: [HttpClient, PokeApiService],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexComponent {
  pokemons: any[] = [];
  limit = 12;
  offset = 0;
  favorites: any[] = [];

  constructor(private pokeApiService: PokeApiService, private appComponent: AppComponent) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    const favorites = localStorage.getItem('favorites');
    this.favorites = favorites ? JSON.parse(favorites) : [];
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeApiService.loadPokemons(this.limit, this.offset).subscribe((pokemons: any[]) => {
      this.pokemons.push(...pokemons);
      this.offset += this.limit;
      this.sortPokemons('id');
    });
  }

  addToFavorites(pokemon: any) {
    this.favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  removeFromFavorites(pokemon: { name: any; }) {
    this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(pokemon: { name: any; }) {
    return this.favorites.some(fav => fav.name === pokemon.name);
  }

  redirectToPokemonDetails(pokemon: any) {
    this.appComponent.navigateWithAnimation(`/pokemon-details/${pokemon.name}`, 'pokedex-page', 'pokemon-details-page');
  }

  sortPokemons(orderBy: string) {
    switch (orderBy) {
      case 'id':
        this.pokemons.sort((a, b) => a.id - b.id);
        break;
      case 'name':
        this.pokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'type':
        this.pokemons.sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name));
        break;
    }
  }
}
