import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { forkJoin, map, mergeMap } from 'rxjs';
import { NavController } from '@ionic/angular';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  providers: [HttpClient, PokeApiService],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PokedexComponent {
  pokemons: any[] = [];
  limit = 12;
  offset = 0;

  constructor(private pokeApiService: PokeApiService, private navCtrl: NavController) {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeApiService.getAllPokemons(this.limit, this.offset).pipe(
      mergeMap(data => data.results),
      mergeMap((pokemon: any) =>
        forkJoin({
          details: this.pokeApiService.getPokemon(pokemon.name),
          description: this.pokeApiService.getDescription(pokemon.name)
        })
      ),
      map(({details, description}) => {
        return { ...details, description };
      })
    ).subscribe((pokemon: any) => {
      this.pokemons.push(pokemon);
      this.offset += this.limit;
      this.sortPokemons('id')
    });
  }

  redirectToPokemonDetails(pokemon: any) {
    console.log('Destino:', `/pokemon-details/${pokemon.name}`);
    this.navCtrl.navigateForward(`/pokemon-details/${pokemon.name}`).then(success => {
      console.log('Foi:', success);
    }).catch(error => {
      console.error('Deu erro:', error);
    });
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
