import { searchSalon } from "./action"
import { FETCH_SALONS, CREATE_SALON, UPDATE_SALON, FETCH_SALON_BY_ID, FETCH_SALON_BY_OWNER_ID, SEARCH_SALONS } from "./actionTypes"

const initialState = {
    salons: [],
    salon: null,
    searchSalon: [],
    loading: false,
    error: null
}

export const salonReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALONS.REQUEST:
        case CREATE_SALON.REQUEST:
        case UPDATE_SALON.REQUEST:
        case FETCH_SALON_BY_ID.REQUEST:
        case FETCH_SALON_BY_OWNER_ID.REQUEST:
        case SEARCH_SALONS.REQUEST:
            return { ...state, loading: true }

        case FETCH_SALONS.SUCCESS:
        case FETCH_SALON_BY_OWNER_ID.SUCCESS:
            return { ...state, salons: action.payload, loading: false }
        case UPDATE_SALON.SUCCESS:
        case CREATE_SALON.SUCCESS:
        case FETCH_SALON_BY_ID.SUCCESS:
            return { ...state, salon: action.payload, loading: false }
        case SEARCH_SALONS.SUCCESS:
            return { ...state, searchSalon: action.payload, loading: false }

        case FETCH_SALONS.FAILURE:
        case CREATE_SALON.FAILURE:
        case UPDATE_SALON.FAILURE:
        case FETCH_SALON_BY_ID.FAILURE:
        case FETCH_SALON_BY_OWNER_ID.FAILURE:
        case SEARCH_SALONS.FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}