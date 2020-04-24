import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoomListComponent} from '../room-list/room-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/rooms',
        pathMatch: 'full',
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
