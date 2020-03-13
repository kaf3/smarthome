import { ActionReducerMap} from '@ngrx/store';
import { AppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';


export const appReducers: Partial<ActionReducerMap<AppState, any>> = {
                                // не оч понятно сюда добавлять всегда всех редюсеров? и как пофиксить варн без any в дженерике
    router: routerReducer
}