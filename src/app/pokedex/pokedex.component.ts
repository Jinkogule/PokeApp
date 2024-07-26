import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCardContent, IonImg} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { AppComponent } from '../app.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  imports: [CommonModule, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCardContent, IonImg],
  providers: [HttpClient, NotificationService],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexComponent implements OnInit {
  pokemons: any[] = [];
  limit = 12;
  offset = 0;
  favorites: any[] = [];

  constructor(private pokeApiService: PokeApiService, private appComponent: AppComponent) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.pokeApiService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeApiService.loadPokemons(this.limit, this.offset).subscribe((pokemons: any[]) => {
      this.pokemons.push(...pokemons);
      this.offset += this.limit;
      this.sortPokemons('id');
    });
  }

  isFavorite(pokemon: { name: any }) {
    return this.pokeApiService.isFavorite(pokemon);
  }

  toggleFavorite(pokemon: any) {
    this.pokeApiService.toggleFavorite(pokemon);
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
