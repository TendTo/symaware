import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { PageScrollService } from 'ngx-page-scroll-core';
import * as $ from "jquery";
import {DOCUMENT} from "@angular/common";

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     console.log(entry)
//     if (entry.isIntersecting) {
//       entry.target.classList.add("show");
//     }
//   });
// });
//
// const hiddenElements = Array.from(document.querySelector('.hidden'))
//
// hiddenElements.forEach((el) => observer.observe(el));


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
  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
  }
  @ViewChild("memberSlider") sliderRef: ElementRef<HTMLElement>

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
    function pagination() {
      let offset = $(document).scrollTop();
      let windowHeight = $(window).height();
      let $body = $(".container_home");
      let padding = 0.75;
      let pages = Object.keys($(".page"))
          .filter((section) => Number(section) + 1)
          .map((section) => Number(section) + 1);

      pages.map((page) => {
        if (offset > windowHeight * (page - 2 + padding)) {
          $body.removeClass().addClass("page-" + page);
        }
      });
    }

    pagination();

    $(document).on("scroll", pagination);

    $(document).on("click", 'a[href^="#"]', function (e) {
      e.preventDefault();
      $(".container_home").animate(
          {
            scrollTop: $(this).offset().top
          },
          500
      );
    });

    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
    });

  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
