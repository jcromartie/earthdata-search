import actions from './index'
import { UPDATE_COLLECTION_QUERY, UPDATE_GRANULE_QUERY } from '../constants/actionTypes'

export const updateCollectionQuery = payload => ({
  type: UPDATE_COLLECTION_QUERY,
  payload
})

export const updateGranuleQuery = payload => ({
  type: UPDATE_GRANULE_QUERY,
  payload
})

export const changeQuery = query => (dispatch) => {
  // query is changing, so reset pageNum
  const newQuery = {
    ...query,
    pageNum: 1
  }

  dispatch(updateCollectionQuery(newQuery))
  dispatch(actions.getCollections())
  dispatch(actions.getGranules())
  dispatch(actions.getTimeline())
}

export const changeCollectionPageNum = pageNum => (dispatch) => {
  dispatch(updateCollectionQuery({ pageNum }))
  dispatch(actions.getCollections())
}

export const changeGranulePageNum = pageNum => (dispatch) => {
  dispatch(updateGranuleQuery({ pageNum }))
  dispatch(actions.getGranules())
}

export const clearFilters = () => (dispatch) => {
  const query = {
    keyword: '',
    spatial: {},
    temporal: {}
  }

  // Remove URL items
  dispatch(actions.changeUrl({}))

  // Update Store
  dispatch(changeQuery(query))
}
