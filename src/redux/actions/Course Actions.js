import axios from 'axios';
import {
    COURSES_FETCHED,
    COURSES_SUGGESTED,
    COURSE_FETCHED,
    COURSE_SELECTED,
    GET_ERRORS,
} from './types';
import { resetDeletion } from './Delete Actions';

export const createCourse = (newCourse, history) => dispatch => {
    axios
        .post('/api/courses/create', newCourse)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getCourses = userID => dispatch => {
    axios
        .get(`/api/courses/createdby/${userID}`)
        .then(res =>
            dispatch({
                type: COURSES_FETCHED,
                payload: res.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getSuggestedCourses = userID => dispatch => {
    axios
        .get(`/api/courses/suggested/${userID}`)
        .then(res =>
            dispatch({
                type: COURSES_SUGGESTED,
                payload: res.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const getCourse = courseID => dispatch => {
    axios
        .get(`/api/courses/${courseID}`)
        .then(res =>
            dispatch({
                type: COURSE_FETCHED,
                payload: res.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const selectCourse = (index, area, history) => dispatch => {
    dispatch({
        type: COURSE_SELECTED,
        payload: index,
        area,
    });
    history.push('/dashboard/course');
};

export const deleteCourse = courseID => dispatch => {
    axios
        .delete(`/api/courses/${courseID}`)
        .then(res => {
            console.log('received');
            resetDeletion();
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};
