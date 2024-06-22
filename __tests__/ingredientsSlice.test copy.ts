import {
    getIngredients,
    ingredientsReducers,
} from "../src/features/ingredientsSlice";
import { configureStore } from "@reduxjs/toolkit";

    const mockIngredients = [
        {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        },
        {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        },
        {
            "_id": "643d69a5c3f7b9001cfa093e",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        },
    ]
    
describe('tests for ingredients slice', () => {

    test('test dispatches FETCH_INGREDIENTS_REQUEST ', () => {
        const store = configureStore({
            reducer: {
            ingredients: ingredientsReducers
            }
        });

        store.dispatch(getIngredients.pending('pending'));
        const state = store.getState().ingredients;
        expect(state.isIngredientsLoading).toBe(true);
        expect(state.error).toBe("");
    });

    test('test dispatches FETCH_INGREDIENTS_SUCCESS ', () => {
        const expectedResult = mockIngredients;
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockIngredients),
            })
        ) as jest.Mock;

        const store = configureStore({
            reducer: {
            ingredients: ingredientsReducers
            }
        });

        store.dispatch(getIngredients.fulfilled(mockIngredients,'pending'));
        const state = store.getState().ingredients;
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.error).toBe("");
        expect(state.ingredients).toBe(expectedResult);
    
    });

    test('test dispatches FETCH_INGREDIENTS_FAILED ', () => {
        const error = new Error('ingredients request error');
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.reject(error),
            })
        ) as jest.Mock;

        const store = configureStore({
            reducer: {
            ingredients: ingredientsReducers
            }
        });

        store.dispatch(getIngredients.rejected( error ,'rejected'));
        const state = store.getState().ingredients;
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.error).toBe(`Ошибка: ${error.message}`);
    });

});
