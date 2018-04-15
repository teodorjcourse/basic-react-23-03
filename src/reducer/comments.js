import { ADD_COMMENT, LOAD_COMMENTS, SUCCESS, START } from '../constants'
import { arrToMap, reducerRecord } from './utils'
import { Record } from 'immutable'

const CommentRecord = Record({
    id: null,
    user: null,
    text: null,
    loading: false
})

export default (state = reducerRecord(CommentRecord), action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], payload.comment)

        case LOAD_COMMENTS + START:
            return state.set('loading', true)

        case LOAD_COMMENTS + SUCCESS: {
            return state
                .set('entities', arrToMap(payload.response, CommentRecord))
                .set('loading', false)
                .set('loaded', true)
        }

        default:
            return state
    }
}