import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';

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

  constructor(private route: ActivatedRoute, private pokeApiService: PokeApiService) { }

  ngOnInit() {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    if (pokemonName) {
      this.pokeApiService.getPokemon(pokemonName).subscribe(data => {
        this.pokemon = data;
      });
    }
  }
}
