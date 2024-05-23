import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from './services/poke-api.service';
import { CommonModule } from '@angular/common';
import { forkJoin, map, mergeMap } from 'rxjs';

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
  pokemons: any[] = [];
  limit = 12;
  offset = 0;

  constructor(private pokeApiService: PokeApiService) {
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
