import {Equipment} from '../../../models/equipment';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface EquipmentListState extends EntityState<Equipment> {}

export const equipmentListAdapter: EntityAdapter<Equipment> = createEntityAdapter<
    Equipment
>({selectId: (equipment: Equipment) => equipment.id, sortComparer: false});

export const initialEquipmentListState: EquipmentListState = equipmentListAdapter.getInitialState();
