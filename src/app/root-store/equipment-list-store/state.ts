import {IEquipment} from '../../../models/iequipment';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface EquipmentListState extends EntityState<IEquipment> {
}

export const equipmentListAdapter: EntityAdapter<IEquipment> = createEntityAdapter<IEquipment>(
  {selectId: (equipment: IEquipment) => equipment.id, sortComparer: false}
);

export const initialEquipmentListState: EquipmentListState = equipmentListAdapter.getInitialState();

