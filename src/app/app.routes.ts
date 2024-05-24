import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pokedex/pokedex.component').then( m => m.PokedexComponent)
  },
  {
    path: 'pokemon-details/:name',
    loadComponent: () => import('./pokemon-details/pokemon-details.component').then( m => m.PokemonDetailsComponent)
  },
];
