import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConsortiumComponent } from './consortium/consortium.component'
import { ContactComponent } from './contact/contact.component'
import { ResearchPublicationsComponent } from './research-publications/research-publications.component'
import { TeamComponent } from './team/team.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { NewsComponent } from './news/news.component'
import { PositionsComponent } from './positions/positions.component'
import { DemonstrationsComponent } from './demonstrations/demonstrations.component'

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'consortium', component: ConsortiumComponent },
    { path: 'contacts', component: ContactComponent },
    { path: 'research-publications', component: ResearchPublicationsComponent },
    { path: 'team', component: TeamComponent },
    { path: 'news', component: NewsComponent },
    // { path: 'available-positions', component: PositionsComponent },
    // { path: 'demonstrations', component: DemonstrationsComponent },
    { path: '**', component: PageNotFoundComponent },
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
