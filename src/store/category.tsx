import { createSlice } from '@reduxjs/toolkit'

interface CateGlobalType{
    category: string
}
interface CateGlobalAction{
    payload: string
}

const categoriesInitialState = {
  category: ''
}

const categories = createSlice({
  name: 'categories',
  initialState: categoriesInitialState,
  reducers: {
    chooseCate(state: CateGlobalType, action: CateGlobalAction) {
      state.category = action.payload
    }
  }
})

export const categoriesAction = categories.actions

export default categories
