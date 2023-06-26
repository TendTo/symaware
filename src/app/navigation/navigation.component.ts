import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})

export class NavigationComponent {

    constructor(
      private router: Router,
      private route: ActivatedRoute) {}
    visible = false;
    @ViewChild('dropdown')menuToggle:ElementRef<HTMLElement>;
    nav = document.querySelectorAll('.container-mob-nav')
    toggle() {
        this.visible = !this.visible
        if (!this.visible){
            this.menuToggle.nativeElement.classList.add("toggle-bar");
        }
        else {
            this.menuToggle.nativeElement.classList.remove("toggle-bar");
        }
    }

    onScroll () {
        // if(window.pageYOffset >=  this.nav.parentNode.offsetTop){
        //
        // }
    }
}


