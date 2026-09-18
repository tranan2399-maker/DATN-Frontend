import { MovieType } from '@/Interface/movie'
import { createSlice } from '@reduxjs/toolkit'
interface MovieStore {
  movies: MovieType[]
}
interface MovieAction {
  payload: MovieType[]
}
interface MovieSelectorChild {
  movies: MovieType[]
}
export interface MovieSelector {
  movies: MovieSelectorChild
}

const moviesInitialState = {
  movies: []
}

const movies = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    fetchData(state: MovieStore, action: MovieAction) {
      state.movies = [...action.payload]
    }
  }
})

export const moviesAction = movies.actions

export default movies
