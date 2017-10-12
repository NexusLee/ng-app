import { Component } from '@angular/core';

@Component({
  template: `
    <h2>HEROES</h2>
    <p>这是 heroes 页面</p>

    <button routerLink="/sidekicks">Go to sidekicks</button>
  `
})
export class HeroListComponent { }
