import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { map, mergeMap } from 'rxjs';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  providers: [PokeApiService],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  typeIds: number[] = [];
  isDesktop: boolean = true;
  favorites: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private appComponent: AppComponent
  ) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.pokeApiService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
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

  isFavorite(pokemon: { name: any }) {
    return this.pokeApiService.isFavorite(pokemon);
  }

  toggleFavorite(pokemon: any) {
    this.pokeApiService.toggleFavorite(pokemon);
  }

  checkScreenSize() {
    const mediaQueryList = window.matchMedia('(min-width: 800px)');
    this.handleScreenSizeChange(mediaQueryList);
    mediaQueryList.addEventListener('change', () => {
      this.handleScreenSizeChange(mediaQueryList);
    });
  }

  handleScreenSizeChange(mediaQueryList: MediaQueryList) {
    this.isDesktop = mediaQueryList.matches;
  }

  redirectToPokedex() {
    this.appComponent.navigateWithAnimation(`/`, 'pokemon-details-page', 'pokedex-page');
  }
}
