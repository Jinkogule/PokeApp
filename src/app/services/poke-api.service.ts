import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

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
}
