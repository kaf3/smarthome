import { Routes } from '@angular/router';
import { RoomComponent } from '../room-list/room/room.component';


export const appRoutes : Routes = [

    {
        path: ':id',
        component: RoomComponent,
    }
        
    
]
