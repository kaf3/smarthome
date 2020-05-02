// Helper function to extract error, if there is one.
import {ErrorState, HasCallState, LoadingState} from '@models';

export function getError<T extends HasCallState = any>(state: T): string | null {
    const {callState} = state;

    if ((callState as ErrorState).errorMsg !== undefined) {
        return (callState as ErrorState).errorMsg;
    }

    return null;
}

export function isLoading<T extends HasCallState = any>(state: T): boolean {
    return state.callState === LoadingState.LOADING;
}

export function isLoaded<T extends HasCallState = any>(state: T): boolean {
    return state.callState === LoadingState.LOADED;
}