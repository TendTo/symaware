import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { newsItem } from './newsItem'
import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import { ImageGeneratorService } from './image-generator.service'

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
    currentSlide: number = 0
    dotHelper: Array<Number> = []
    newsItems = newsItem
    @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>
    slider: KeenSliderInstance = null
    constructor(private imageGenerator: ImageGeneratorService) {}
    ngOnInit(): void {
        void this.updateResolvedCoverImage()
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                mode: 'free-snap',
                initial: 0,
                slideChanged: (s) => {
                    this.currentSlide = s.track.details.rel
                },
                breakpoints: {
                    '(min-width: 400px)': {
                        slides: { perView: 1, spacing: 5 },
                    },
                    '(min-width: 700px)': {
                        slides: { perView: 2, spacing: 10 },
                    },
                    '(min-width: 1200px)': {
                        slides: { perView: 3, spacing: 0 },
                    },
                    '(min-width: 1800px)': {
                        slides: { perView: 4, spacing: 0 },
                    },
                },
            })
            this.dotHelper = [
                ...Array(this.slider.track.details.slides.length - 2).keys(),
            ]
        })
    }
    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    private async updateResolvedCoverImage(): Promise<void> {
        for (const item of this.newsItems) {
            if (typeof window !== 'undefined' && !item.image) {
                try {
                    const generated =
                        await this.imageGenerator.generateCoverPlaceholder({
                            title: item.title || 'LinkedIn update',
                            subtitle: 'New LinkedIn post!',
                            width: 290,
                            height: 160,
                        })
                    item.image = generated.dataUrl
                } catch {
                    item.image = ''
                }
            }
        }
    }
}
