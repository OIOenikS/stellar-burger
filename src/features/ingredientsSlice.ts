import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

export interface IIngredientsState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  error: string;
}

export const initialState: IIngredientsState = {
  isIngredientsLoading: false,
  ingredients: [],
  error: ''
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isIngredientsLoading = true;
      state.error  = '';
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isIngredientsLoading = false;
      state.error  = `Ошибка: ${action.error.message}`;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      state.ingredients = action.payload;
      state.error  = '';
    });
  }
});

export const { selectIngredients, selectIsIngredientsLoading } =
  ingredientsSlice.selectors;

export const {} = ingredientsSlice.actions;

export const ingredientsReducers = ingredientsSlice.reducer;
