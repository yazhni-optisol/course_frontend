/* eslint-disable no-unused-vars */
import { ANSWERS_FETCHED } from '../actions/types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    questionID: null,
    list: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ANSWERS_FETCHED:
            return {
                ...state,
                questionID: action.questionID,
                list: action.payload
            }

        default:
            return state;
    }
}
