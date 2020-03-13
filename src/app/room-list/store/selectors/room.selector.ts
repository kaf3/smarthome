import { createSelector} from '@ngrx/store';
import { selectRooms, selectRoomsAndRoomState } from './rooms.selector';
import { selectAppRouter } from '../../../store/selectors/app-router-selectors';

export const selectRoom = createSelector(selectRoomsAndRoomState, (state) => state.roomState.room);

export const selectSelectedRoom = createSelector(selectRooms, selectAppRouter, (rooms, route) => rooms[route.params.id]);

