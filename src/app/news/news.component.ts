import { Component, OnInit} from "@angular/core";

//test

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







