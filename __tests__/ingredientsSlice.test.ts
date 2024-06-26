import {
    getIngredients,
    initialState,
    ingredientsSlice
} from "../src/features/ingredientsSlice";
import { TIngredient } from '../src/utils/types';


    const mockIngredients: TIngredient[] = [
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
    test("initializes correctly", () =>{
        const state = ingredientsSlice.reducer(undefined, { type: ""})
        expect(state).toEqual(initialState);
    })

    test('test getIngredients pending', () => {
        const action = { type: getIngredients.pending.type};
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isLoading: true, error: ''});
    });

    test('test getIngredients rejected', () => {
        const action = { type: getIngredients.rejected.type, error: { message: "Test" } };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error: "Test", isLoading: false});
    });

    test('test getIngredients fulfilled', () => {
        const action = { type: getIngredients.fulfilled.type, payload: mockIngredients };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, ingredients: mockIngredients, isLoading: false, error: '' });
    });
});
