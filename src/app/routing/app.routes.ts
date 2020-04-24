import {Routes} from '@angular/router';
import {RoomComponent} from '../room-list/room/room.component';
import {EquipmentComponent} from '../room-list/room/equipment-list/equipment/equipment.component';

export const appRoutes: Routes = [
    {
        path: ':id',
        component: RoomComponent,
        children: [
            {
                path: ':detail',
                component: EquipmentComponent,
            },
        ],
    },
];
