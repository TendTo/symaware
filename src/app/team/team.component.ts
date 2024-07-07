import { Component } from '@angular/core'

import { members, leaders, institutions } from './members'
import { trigger, style, animate, transition } from '@angular/animations'

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
    animations: [
        trigger('inOutAnimation', [
            transition(':leave', [
                style({
                    opacity: 1,
                    filter: 'blur(0px)',
                    // transform: "translateX(0)",
                }),
                animate(
                    '0.25s ease-out',
                    style({
                        opacity: 0,
                        filter: 'blur(2px)',
                        // transform: "translateX(100%)",
                    })
                ),
            ]),
        ]),
    ],
})
export class TeamComponent {
    members = members
    leaders = leaders
    institutions = institutions
    selected
    all

    onMouseEnter(hoverName: HTMLElement) {
        hoverName.classList.remove('hide')
    }
    onMouseLeave(hoverName: HTMLElement) {
        hoverName.classList.add('hide')
    }
}
