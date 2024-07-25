import { Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { FavoritePokemonsComponent } from './favorite-pokemons/favorite-pokemons.component';

export const routes: Routes = [
  {
    path: '',
    component: PokedexComponent
  },
  {
    path: 'pokemon-details/:name',
    component: PokemonDetailsComponent
  },
  {
    path: 'favorite-pokemons',
    component: FavoritePokemonsComponent
  },
];
