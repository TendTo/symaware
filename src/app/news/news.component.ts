import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { newsItem } from './newsItem'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: [
        './news.component.scss',
        '../../../node_modules/keen-slider/keen-slider.min.css',
    ],
})
export class NewsComponent implements OnInit {
    title = 'news'
    currentSlide: number = 1
    dotHelper: Array<Number> = []
    newsItems = newsItem
    @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>
    slider: KeenSliderInstance = null
    ngOnInit(): void {}

    ngAfterViewInit() {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                slides: {
                    perView: 3,
                },
                mode: 'free-snap',
                initial: this.currentSlide,
                slideChanged: (s) => {
                    this.currentSlide = s.track.details.rel
                },
                breakpoints: {
                    '(max-width: 1200px)': {
                        slides: {
                            perView: 2,
                        },
                        initial: 0,
                    },
                    '(max-width: 600px)': {
                        slides: {
                            perView: 1,
                        },
                        initial: 0,
                    },
                },
            })
            this.dotHelper = [
                ...Array(this.slider.track.details.slides.length).keys(),
            ]
        })
    }
    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }
}
