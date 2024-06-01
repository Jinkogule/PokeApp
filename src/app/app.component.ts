import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController, AnimationController } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [IonicModule, RouterOutlet],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppComponent {
  constructor(private navCtrl: NavController, private animationCtrl: AnimationController) {}

  async navigateWithAnimation(path: string, fromPageId: string, toPageId: string) {
    const element = document.querySelector<HTMLElement>(`#${fromPageId}`);
    if (element) {
      const fadeOut = this.animationCtrl
        .create()
        .addElement(element)
        .duration(500)
        .easing('ease-out')
        .fromTo('opacity', '1', '0');
      await fadeOut.play();
      await this.navCtrl.navigateForward(path);

      const newElement = document.querySelector<HTMLElement>(`#${toPageId}`);

      if (newElement) {
        newElement.style.opacity = '0';
        const fadeIn = this.animationCtrl
          .create()
          .addElement(newElement)
          .duration(500)
          .easing('ease-in')
          .fromTo('opacity', '0', '1');
        await fadeIn.play();
      }
    }
  }

  redirectToFavoritePokemons() {
    this.navigateWithAnimation(`/favorite-pokemons`, 'pokedex-page', 'favorite-pokemons-page');
  }

  redirectToPokedex() {
    this.navigateWithAnimation(`/`, 'favorite-pokemons-page', 'pokedex-page');
  }
}
