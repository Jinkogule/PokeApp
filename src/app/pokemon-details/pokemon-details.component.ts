import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PokemonDetailsComponent  implements OnInit {
  pokemon: any;
  favorites: any[] = [];
  typeIds: number[] = [];

  constructor(private route: ActivatedRoute, private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    if (pokemonName) {
      this.pokeApiService.getPokemon(pokemonName).pipe(
        mergeMap((pokemon: any) => {
          return this.pokeApiService.getDescription(pokemonName).pipe(
            map(description => ({ ...pokemon, description }))
          );
        })
      ).subscribe(data => {
        this.pokemon = data;
        const typeNames = this.pokemon?.types.map((type: any) => type.type.name);
        if (typeNames) {
          this.pokeApiService.getTypeIdsByNames(typeNames).subscribe(ids => {
            this.typeIds = ids;
          });
        }
      });
    }
  }

  addToFavorites(pokemon: any) {
    this.pokeApiService.addToFavorites(pokemon);
  }

  removeFromFavorites(pokemon: { name: any }) {
    this.pokeApiService.removeFromFavorites(pokemon);
  }

  isFavorite(pokemon: { name: any }) {
    return this.pokeApiService.isFavorite(pokemon);
  }
}
