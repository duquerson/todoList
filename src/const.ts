
//state's handle's
export const stateTodo = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    COMPLETE: 'COMPLETE',
    DRAG: 'DRAG',
    LOAD: 'LOAD',
    LOAD_SUCCESS: 'LOAD_SUCCESS',
    LOAD_ERROR: 'LOAD_ERROR',
    SET_FILTER: 'SET_FILTER',
    CLEAR_COMPLETE: 'CLEAR_COMPLETE',
    
} as const


export const filter = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const;

export const  FILTERS_BUTTONS = {
    [filter.ALL]:{
        literal: "All",
        href: `/?filter=${filter.ALL}`
    },
    [filter.ACTIVE]: {
        literal: "Active",
        href:`/?filter=${filter.ACTIVE}`
    },
    [filter.COMPLETED]: {
        literal:"Completed",
        href:`/?filter=${filter.COMPLETED}`
    }

}as const;

