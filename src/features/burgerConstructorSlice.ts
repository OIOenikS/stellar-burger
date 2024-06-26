import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredientInConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type !== 'bun') {
          state.constructorItems.ingredients.push(action.payload);
        } else {
          state.constructorItems.bun = action.payload;
        }
        console.log(state.constructorItems);
      },
      prepare: (ingredien: TIngredient) => {
        const id = uuidv4();
        console.log(id);
        return { payload: { ...ingredien, id } };
      }
    },
    deleteIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveForwardIngredient: (state, action: PayloadAction<number>) => {
      const ingredient = state.constructorItems.ingredients.splice(
        action.payload,
        1
      )[0];
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        ingredient
      );
    },
    moveBackIngredient: (state, action: PayloadAction<number>) => {
      const ingredient = state.constructorItems.ingredients.splice(
        action.payload,
        1
      )[0];
      state.constructorItems.ingredients.splice(
        action.payload + 1,
        0,
        ingredient
      );
    },
    resetConstructorItems: (state) => {
      state.constructorItems = initialState.constructorItems;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  }
});

export const { selectConstructorItems } = burgerConstructorSlice.selectors;

export const {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  moveForwardIngredient,
  moveBackIngredient,
  resetConstructorItems
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
