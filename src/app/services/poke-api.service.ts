import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  favorites: any[] = [];
  constructor(private http: HttpClient) {
    this.loadFavoritesFromLocalStorage();
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }

  getDescription(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${name}`).pipe(
      map((descriptionData: any) => {
        const flavorTextEntries = descriptionData.flavor_text_entries;
        const englishFlavorTextEntries = flavorTextEntries.filter((entry: { language: { name: string; }; }) => entry.language.name === 'en');
        return englishFlavorTextEntries[0]?.flavor_text.replace(/\f/g, ' ');
      })
    );
  }

  getAllPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  loadPokemons(limit: number, offset: number): Observable<any[]> {
    return this.getAllPokemons(limit, offset).pipe(
      mergeMap(data => data.results),
      mergeMap((pokemon: any) =>
        forkJoin({
          details: this.getPokemon(pokemon.name),
          description: this.getDescription(pokemon.name)
        })
      ),
      map(({ details, description }) => ({ ...details, description })),
      toArray()
    );
  }

  getTypeIdsByNames(typeNames: string[]): Observable<number[]> {
    const requests: Observable<any>[] = [];
    for (const typeName of typeNames) {
      requests.push(this.http.get(`${this.baseUrl}/type/${typeName}`).pipe(map((typeData: any) => typeData.id)));
    }
    return forkJoin(requests);
  }

  addToFavorites(pokemon: any) {
    this.favorites.push(pokemon);
    this.saveFavoritesToLocalStorage();
  }

  removeFromFavorites(pokemon: { name: any }) {
    this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
    this.saveFavoritesToLocalStorage();
  }

  isFavorite(pokemon: { name: any }) {
    return this.favorites.some(fav => fav.name === pokemon.name);
  }

  private loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  private saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
