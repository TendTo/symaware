import { Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-consortium',
    templateUrl: './consortium.component.html',
    styleUrls: ['./consortium.component.scss'],
})
export class ConsortiumComponent {
    constructor(private meta: Meta) {}

    ngOnInit(): void {
        document.title = 'Consortium | SymAware'
        this.meta.addTag({ name: 'title', content: 'Consortium | SymAware' })
        this.meta.addTag({
            name: 'description',
            content:
                'Page presents companies & institutions that contribute to the project.',
        })
    }

    ngOnDestroy(): void {
        this.meta.removeTag('name="title"')
        this.meta.removeTag('name="description"')
    }
}
