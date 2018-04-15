import { OrderedMap, Record } from 'immutable'

export function arrToMap(arr, ItemRecord) {
    return arr.reduce((acc, item) =>
            acc.set(item.id, ItemRecord ? new ItemRecord(item) : item)
        , new OrderedMap({}))
}

export function reducerRecord(record) {
    return Record({
        entities: arrToMap([], record),
        loading: false,
        loaded: false
    })()
}