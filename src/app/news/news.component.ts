import { Component, OnInit, SecurityContext } from "@angular/core";

@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
    title = 'news';

    ngAfterViewInit(): void {
        (<any>window).twttr.widgets.load();
    }

    ngOnInit(): void {
    }
}







