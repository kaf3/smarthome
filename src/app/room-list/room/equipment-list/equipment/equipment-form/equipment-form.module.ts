import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentFormComponent} from './equipment-form.component';
import {EquipmentFormStoreModule} from 'src/app/root-store';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgrxFormsModule} from 'ngrx-forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [EquipmentFormComponent],
    exports: [EquipmentFormComponent],
    imports: [
        CommonModule,
        EquipmentFormStoreModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        NgrxFormsModule,
        MatButtonModule,
        MatCardModule,
    ],
})
export class EquipmentFormModule {}
