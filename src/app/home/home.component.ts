import { Component, ElementRef, ViewChild, Inject } from '@angular/core'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import { Router, NavigationEnd } from '@angular/router'

//

const animation = { duration: 5000, easing: (t) => t }
// const hiddenElements = document.querySelectorAll('.u-hidden');

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
    // @ViewChild("memberSlider") sliderRef: ElementRef<HTMLElement>
    //
    // slider: KeenSliderInstance = null
    mobile = false
    ngAfterViewInit() {
        // this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        //   loop: true,
        //   renderMode: "performance",
        //   drag: false,
        //   slides: {
        //     perView: 5,
        //     origin: "center",
        //   },
        //   created(s) {
        //     s.moveToIdx(1, true, animation)
        //   },
        //   updated(s) {
        //     s.moveToIdx(s.track.details.abs + 1, true, animation)
        //   },
        //   animationEnded(s) {
        //     s.moveToIdx(s.track.details.abs + 1, true, animation)
        //   },
        // })

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }
    // ngOnDestroy() {
    //   if (this.slider) this.slider.destroy()
    // }

    scrollTo(element: any): void {
        ;(document.getElementById(element) as HTMLElement).scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        })
    }
    ngOnInit() {
        //checks screen size to apply dynamic styling
        if (screen.width <= 900) {
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
