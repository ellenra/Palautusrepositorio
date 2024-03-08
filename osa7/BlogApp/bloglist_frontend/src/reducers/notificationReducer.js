import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { goodnotification: null, error: null },
  reducers: {
    showGoodNotification(state, action) {
      state.goodnotification = action.payload
    },
    showErrorNotification(state, action) {
      state.error = action.payload
    },
    clearNotification(state) {
      state.goodnotification = null
      state.error = null
    },
  },
})

export const {
  showGoodNotification,
  showErrorNotification,
  clearNotification,
} = notificationSlice.actions

export const setNotification = (content, type) => (dispatch) => {
  if (type === 'error') {
    dispatch(showErrorNotification(content))
  } else {
    dispatch(showGoodNotification(content))
  }

  setTimeout(() => {
    dispatch(clearNotification())
  }, 7000)
}

export default notificationSlice.reducer
