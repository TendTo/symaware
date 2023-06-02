import { Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

const animation = { duration: 5000, easing: (t) => t }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    "../../../node_modules/keen-slider/keen-slider.scss",
    "./home.component.scss",
  ],
})

export class HomeComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      renderMode: "performance",
      drag: false,
      slides: {
        perView: 5,
        origin: "center",
      },
      created(s) {
        s.moveToIdx(1, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 1, true, animation)
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
