import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        '../../../node_modules/keen-slider/keen-slider.scss',
        './home.component.scss',
    ],
})
export class HomeComponent {
    constructor(private router: Router) {}

    mobile = false
    ngAfterViewInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }

    scrollTo(element: any): void {
        ;(document.getElementById(element) as HTMLElement).scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        })
    }
    ngOnInit() {
        //checks screen size to apply dynamic styling
        if (screen.width <= 600) {
            this.mobile = true
        } else {
            this.mobile = false
        }

        //Checks whether HTML elements are observed by user, if true, it adds slide-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry)
                if (entry.isIntersecting) {
                    entry.target.classList.add('u-show')
                    entry.target.classList.remove('u-hidden')
                }
            })
        })

        const hiddenElements = document.querySelectorAll('.u-hidden')
        hiddenElements.forEach((el) => observer.observe(el))
    }
}
