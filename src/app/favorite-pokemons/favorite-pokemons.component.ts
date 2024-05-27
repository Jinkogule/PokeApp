import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-favorite-pokemons',
  templateUrl: './favorite-pokemons.component.html',
  styleUrls: ['./favorite-pokemons.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  providers: [HttpClient, PokeApiService],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavoritePokemonsComponent {
  pokemons: any[] = [];
  limit = 12;
  offset = 0;
  favorites: any[] = [];

  constructor(private pokeApiService: PokeApiService) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    const favorites = localStorage.getItem('favorites');
    this.favorites = favorites ? JSON.parse(favorites) : [];
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    this.pokeApiService.loadPokemons(this.limit, this.offset).subscribe((pokemons: any[]) => {
      const favoritePokemons = pokemons.filter(pokemon => this.isFavorite(pokemon));
      this.pokemons.push(...favoritePokemons);
      this.offset += this.limit;
      this.sortPokemons('id');
    });
  }

  isFavorite(pokemon: { name: any; }) {
    return this.favorites.some(fav => fav.name === pokemon.name);
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
