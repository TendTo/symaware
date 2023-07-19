import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    constructor(private router: Router, private route: ActivatedRoute) {}

    @ViewChild('dropdown') menuToggle: ElementRef<HTMLElement>

    sticky
    nav
    visible = false
    ngOnInit(): void {
        this.nav = document.querySelector('.navbar')
        console.log(this.nav)
        this.sticky = this.nav.offsetY
    }

    toggle() {
        this.visible = !this.visible
        if (!this.visible) {
            this.menuToggle.nativeElement.classList.add('toggle-bar')
        } else {
            this.menuToggle.nativeElement.classList.remove('toggle-bar')
        }
    }
}
