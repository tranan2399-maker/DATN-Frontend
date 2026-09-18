import { FoodItemState } from '@/Interface/food'
import { createSlice } from '@reduxjs/toolkit'


interface FoodAction {
  payload: FoodItemState
}
interface FoodActionFetchData {
  payload: FoodItemState[]
}

interface FoodState {
  foods: FoodItemState[]
}
export interface FoodSelectorChild {
  foods: FoodItemState[]
}
export interface FoodSelector {
  foods: FoodSelectorChild
}
const foodInitialState = {
  foods: []
}

const foods = createSlice({
  name: 'foods',
  initialState: foodInitialState,
  reducers: {
    fetchData(state: FoodState, action: FoodActionFetchData) {
      state.foods = [...action.payload]
    },
    incrementFood(state: FoodState, action: FoodAction) {
      const existFood = state.foods.some(
        (food: FoodItemState) => food._id === action.payload._id
      )

      if (existFood) {
        state.foods = [
          ...state.foods.map((food: FoodItemState) => {
            if (food._id === action.payload._id) {
              return {
                ...food,
                quantity: food.quantity + 1
              }
            }
            return food
          })
        ]
        return
      }
      state.foods = [...state.foods, action.payload]
    },
    onChangeFood(state: FoodState, action: FoodAction) {
      // const existFood = state.foods.some(
      //   (food: FoodItemState) => food._id === action.payload._id
      // )
      // if (existFood) {
      state.foods = [
        ...state.foods.map((food: FoodItemState) => {
          if (food._id === action.payload._id) {
            return {
              ...food,
              quantity: action.payload.quantity
            }
          }
          return food
        })
      ]
      return
      // }
      // state.foods = [...state.foods, action.payload]
    },
    decrementFood(state: FoodState, action: FoodAction) {
      state.foods = [
        ...state.foods.map((food: FoodItemState) => {
          if (food._id === action.payload._id && food.quantity >= 1) {
            return {
              ...food,
              quantity: food.quantity - 1
            }
          }
          return food
        })
      ]
    }
  }
})

export const foodsAction = foods.actions

export default foods
