import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController, AnimationController } from '@ionic/angular';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

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
export class AppComponent implements OnInit {
  currentPageId: string = 'default-page-id';

  constructor(private router: Router, private animationCtrl: AnimationController, private navCtrl: NavController) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentPageId();
    });
  }

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

  updateCurrentPageId() {
    const currentUrl = this.router.url;
    if (currentUrl === '/') {
      this.currentPageId = 'pokedex-page';
    } else if (currentUrl.startsWith('/pokemon-details')) {
      this.currentPageId = 'pokemon-details-page';
    } else if (currentUrl === '/favorite-pokemons') {
      this.currentPageId = 'favorite-pokemons-page';
    } else {
      this.currentPageId = 'default-page-id';
    }
  }

  redirectToPokedex() {
    this.navigateWithAnimation('/', this.currentPageId, 'pokedex-page');
  }

  redirectToFavoritePokemons() {
    this.navigateWithAnimation('/favorite-pokemons', this.currentPageId, 'favorite-pokemons-page');
  }
}
