import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) {
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

  private loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    this.favoritesSubject.next(favorites);
  }

  private saveFavoritesToLocalStorage(favorites: any[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  addToFavorites(pokemon: any) {
    const favorites = [...this.favoritesSubject.value, pokemon];
    this.saveFavoritesToLocalStorage(favorites);
    const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    this.notificationService.showSuccess(`${capitalizedPokemonName} foi adicionado aos favoritos`);
  }

  removeFromFavorites(pokemon: { name: any }) {
    const favorites = this.favoritesSubject.value.filter(fav => fav.name !== pokemon.name);
    this.saveFavoritesToLocalStorage(favorites);
    const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    this.notificationService.showSuccess(`${capitalizedPokemonName} foi removido dos favoritos`);
  }

  isFavorite(pokemon: { name: any }): boolean {
    return this.favoritesSubject.value.some(fav => fav.name === pokemon.name);
  }

  toggleFavorite(pokemon: any) {
    if (this.isFavorite(pokemon)) {
      this.removeFromFavorites(pokemon);
    } else {
      this.addToFavorites(pokemon);
    }
  }
}
