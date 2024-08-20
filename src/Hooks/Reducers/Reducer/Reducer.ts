import { Action_Todos, State_Todos } from "../../../types/type";
import { actionHandlers } from "../Actions/Actions";
// Reducer
export const reducer = (state: State_Todos, action: Action_Todos): State_Todos => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};
