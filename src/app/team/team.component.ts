import { Component } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { NgFor, NgIf } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { members, leaders, institutions } from "./members";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
  animations: [
    trigger("inOutAnimation", [
      // transition(":enter", [
      //   style({
      //     // transform: "translateX(-100%)",
      //     opacity: 0,
      //     filter: "blur(2px)",
      //     height: "0",
      //   }),
      //   animate(
      //     "0.5s ease-in-out",
      //     style({
      //       // transform: "translateX(0)",
      //       opacity: 1,
      //       filter: "blur(0px)",
      //       height: "inherit",
      //     })
      //   ),
      // ]),
      transition(":leave", [
        style({
          opacity: 1,
          filter: "blur(0px)",
          // transform: "translateX(0)",
        }),
        animate(
          "0.25s ease-out",
          style({
            opacity: 0,
            filter: "blur(2px)",
            // transform: "translateX(100%)",
          })
        ),
      ]),
    ]),
  ],
})
export class TeamComponent {
  members = members;
  leaders = leaders;
  institutions = institutions;
  selected;
  all;

  onMouseEnter(hoverName: HTMLElement) {
    hoverName.classList.remove("hide");
  }
  onMouseLeave(hoverName: HTMLElement) {
    hoverName.classList.add("hide");
  }
}
