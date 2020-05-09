import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    EquipmentPartitionService,
    HttpRoomsService,
    SerializeService,
    SidenavService,
} from '@services';
import {EquipmentResolver} from '../ui/room-list/room/equipment/equipment.resolver';

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                HttpRoomsService,
                EquipmentPartitionService,
                SerializeService,
                SidenavService,
                EquipmentResolver,
            ],
        };
    }
}
