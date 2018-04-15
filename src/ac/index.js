import {INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT,
    LOAD_ALL_ARTICLES, LOAD_ARTICLE,
    LOAD_COMMENTS,
    START, SUCCESS, FAIL } from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticleById(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        //setTimeout is dev only!!!!
        setTimeout(() => {
            fetch(`/api/article/${id}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_ARTICLE + SUCCESS,
                    payload: { response }
                }))
                .catch(error => dispatch({
                    type: LOAD_ARTICLE + FAIL,
                    payload: { error }
                }))
        }, 1000)
    }
}

//  у меня была идея сделать обертку для данного кода, чтобы он не дублировался
// но т.к. до рабочего состояния довести не удалось, то так и оставил
export function loadCommentsByArticleId(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMMENTS + START,
            payload: { id }
        })

        setTimeout(() => {
            fetch(`/api/comment?article=${id}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_COMMENTS + SUCCESS,
                    payload: { response }
                }))
                .catch(error => dispatch({
                    type: LOAD_COMMENTS + FAIL,
                    payload: { error }
                }))
        }, 1000)
    }
}