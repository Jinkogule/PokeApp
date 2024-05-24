import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent],
  standalone: true,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppComponent {
  constructor() {}
}
