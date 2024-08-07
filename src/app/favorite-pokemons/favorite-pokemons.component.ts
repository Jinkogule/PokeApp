import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { forkJoin } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-favorite-pokemons',
  templateUrl: './favorite-pokemons.component.html',
  styleUrls: ['./favorite-pokemons.component.scss'],
  imports: [CommonModule, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg],
  providers: [HttpClient, PokeApiService],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavoritePokemonsComponent {
  pokemons: any[] = [];
  favorites: any[] = [];

  constructor(private pokeApiService: PokeApiService, private appComponent: AppComponent) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites: any[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    this.pokemons = [];
    favorites.forEach(favorite => {
        forkJoin({
            details: this.pokeApiService.getPokemon(favorite.name),
            description: this.pokeApiService.getDescription(favorite.name)
        }).subscribe(
            ({ details, description }) => {
                details.description = description;
                this.pokemons.push(details);
            },
            (error) => {
                console.error(`Falha ao carregar detalhes de ${favorite.name}: `, error);
            }
        );
    });
  }

  redirectToPokedex() {
    this.appComponent.navigateWithAnimation(`/`, 'favorite-pokemons-page', 'pokedex-page');
  }

  redirectToPokemonDetails(pokemon: any) {
    this.appComponent.navigateWithAnimation(`/pokemon-details/${pokemon.name}`, 'favorite-pokemons-page', 'pokemon-details-page');
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
