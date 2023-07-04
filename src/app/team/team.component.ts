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
      transition(":enter", [
        style({ transform: "translateX(-100%)", opacity: 0 }),
        animate(
          "0.5s ease-in",
          style({ transform: "translateX(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.1s ease-in", style({ opacity: 0 })),
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
}
