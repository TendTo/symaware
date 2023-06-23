import { Component } from '@angular/core';
import { deliverables } from "./deliverables";
import { publications } from "./publications"
import {MatInputModule} from '@angular/material/input';
import {NgFor, NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-research-publications',
  templateUrl: './research-publications.component.html',
  styleUrls: ['./research-publications.component.scss']
})
export class ResearchPublicationsComponent {
  deliverables = deliverables;
  publications = publications;
  selected = 'all';
  all = "All Publications";
  sort_selected = 'all'

}
