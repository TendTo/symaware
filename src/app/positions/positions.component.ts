import { Component } from '@angular/core'
import { institutions } from 'src/app/team/members'
@Component({
    selector: 'app-positions',
    templateUrl: './positions.component.html',
    styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent {
    constructor() {}

    selected
    institutions = institutions
}
