import {  
    addIngredientInConstructor, 
    deleteIngredientFromConstructor, 
    moveForwardIngredient, 
    burgerConstructorReducer, 
    moveBackIngredient,
    resetConstructorItems  } from "../src/features/burgerConstructorSlice";

// Мокаем функцию uuid
jest.mock('uuid', () => ({ v4: () => 'uuid id' }));

const mockInitialBurgerConstructorState = {
    constructorItems: {
        bun: {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            id: "65ef1dcd-b51c-4be2-9bcc-0c98e4de5ff7"
        },
        ingredients: [
            {
                _id: "643d69a5c3f7b9001cfa0946",
                name: "Хрустящие минеральные кольца",
                type: "main",
                proteins: 808,
                fat: 689,
                carbohydrates: 609,
                calories: 986,
                price: 300,
                image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
                image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
                id: "fbd334ab-f1f6-42bd-8dde-41fb38d77c79"
            },
            {
                _id: "643d69a5c3f7b9001cfa0948",
                name: "Кристаллы марсианских альфа-сахаридов",
                type: "main",
                proteins: 234,
                fat: 432,
                carbohydrates: 111,
                calories: 189,
                price: 762,
                image: "https://code.s3.yandex.net/react/code/core.png",
                image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/core-large.png",
                id: "6e256ab6-cf11-41ac-b033-c0a974d36619"
            },
            {
                _id: "643d69a5c3f7b9001cfa0945",
                name: "Соус с шипами Антарианского плоскоходца",
                type: "sauce",
                proteins: 101,
                fat: 99,
                carbohydrates: 100,
                calories: 100,
                price: 88,
                image: "https://code.s3.yandex.net/react/code/sauce-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
                id: "649a9a32-9df1-4d2c-9eb8-264eb17864b6"
            }
        ]
    }
};

const expectedSortResultAfterDeleteIngredient = {
    bun: {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        id: "65ef1dcd-b51c-4be2-9bcc-0c98e4de5ff7"
    },
    ingredients: [
        {
            _id: "643d69a5c3f7b9001cfa0948",
            name: "Кристаллы марсианских альфа-сахаридов",
            type: "main",
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: "https://code.s3.yandex.net/react/code/core.png",
            image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/core-large.png",
            id: "6e256ab6-cf11-41ac-b033-c0a974d36619"
        },
        {
            _id: "643d69a5c3f7b9001cfa0945",
            name: "Соус с шипами Антарианского плоскоходца",
            type: "sauce",
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: "https://code.s3.yandex.net/react/code/sauce-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            id: "649a9a32-9df1-4d2c-9eb8-264eb17864b6"
        }
    ]
};

const expectedSortResultAfterMoveForwardIngredient = {
    bun: {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        id: "65ef1dcd-b51c-4be2-9bcc-0c98e4de5ff7"
    },
    ingredients: [
        {
            _id: "643d69a5c3f7b9001cfa0948",
            name: "Кристаллы марсианских альфа-сахаридов",
            type: "main",
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: "https://code.s3.yandex.net/react/code/core.png",
            image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/core-large.png",
            id: "6e256ab6-cf11-41ac-b033-c0a974d36619"
        },
        {
            _id: "643d69a5c3f7b9001cfa0946",
            name: "Хрустящие минеральные кольца",
            type: "main",
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
            image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            id: "fbd334ab-f1f6-42bd-8dde-41fb38d77c79"
        },
        {
            _id: "643d69a5c3f7b9001cfa0945",
            name: "Соус с шипами Антарианского плоскоходца",
            type: "sauce",
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: "https://code.s3.yandex.net/react/code/sauce-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            id: "649a9a32-9df1-4d2c-9eb8-264eb17864b6"
        }
    ]    
};

const expectedSortResultAfterMoveBackIngredient = {
    bun: {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        id: "65ef1dcd-b51c-4be2-9bcc-0c98e4de5ff7"
    },
    ingredients: [
        {
            _id: "643d69a5c3f7b9001cfa0946",
            name: "Хрустящие минеральные кольца",
            type: "main",
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
            image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            id: "fbd334ab-f1f6-42bd-8dde-41fb38d77c79"
        },
        {
            _id: "643d69a5c3f7b9001cfa0945",
            name: "Соус с шипами Антарианского плоскоходца",
            type: "sauce",
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: "https://code.s3.yandex.net/react/code/sauce-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            id: "649a9a32-9df1-4d2c-9eb8-264eb17864b6"
        },
        {
            _id: "643d69a5c3f7b9001cfa0948",
            name: "Кристаллы марсианских альфа-сахаридов",
            type: "main",
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: "https://code.s3.yandex.net/react/code/core.png",
            image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/core-large.png",
            id: "6e256ab6-cf11-41ac-b033-c0a974d36619"
        }
    ]
};

describe("tests for burgerConstructor slice", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    })

    describe("tests reducer for add ingredient in burgerConstructor", () => {
        test("test add filling in burgerConstructor", () => {
            const initialBurgerConstructorState = {
                constructorItems: {
                    bun: null,
                    ingredients: []
                }
            };
            const newState = burgerConstructorReducer(initialBurgerConstructorState, addIngredientInConstructor({
                calories: 420,
                carbohydrates: 33,
                fat: 244,
                image: "https://code.s3.yandex.net/react/code/meat-02.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                name: "Мясо бессмертных моллюсков Protostomia",
                price: 1337,
                proteins: 433,
                type: "main",
                _id: "643d69a5c3f7b9001cfa093f"
            }));
            const { constructorItems } = newState;
            expect(constructorItems).toEqual({
                bun: null,
                ingredients: [{
                    calories: 420,
                    carbohydrates: 33,
                    fat: 244,
                    image: "https://code.s3.yandex.net/react/code/meat-02.png",
                    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                    name: "Мясо бессмертных моллюсков Protostomia",
                    price: 1337,
                    proteins: 433,
                    type: "main",
                    _id: "643d69a5c3f7b9001cfa093f",
                    id: "uuid id", // Предсказуемое значение ID
                }]
            });
        });

        test("test add bun in burgerConstructor", () => {
            const initialBurgerConstructorState = {
                constructorItems: {
                    bun: null,
                    ingredients: []
                }
            };
            const newState = burgerConstructorReducer(initialBurgerConstructorState, addIngredientInConstructor({
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                name: "Флюоресцентная булка R2-D3",
                price: 988,
                proteins: 44,
                type: "bun",
                _id: "643d69a5c3f7b9001cfa093d"
            }));
            const { constructorItems } = newState;
            expect(constructorItems).toEqual({
                bun: {
                    calories: 643,
                    carbohydrates: 85,
                    fat: 26,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    proteins: 44,
                    type: "bun",
                    _id: "643d69a5c3f7b9001cfa093d",
                    id: "uuid id", // Предсказуемое значение ID
                },
                ingredients: []
            });
        });
    })

    test("test reducer for delete ingredient from constructor", () => {
        const initialBurgerConstructorState = mockInitialBurgerConstructorState;
        const newState = burgerConstructorReducer(initialBurgerConstructorState, deleteIngredientFromConstructor("fbd334ab-f1f6-42bd-8dde-41fb38d77c79"));
        const { constructorItems } = newState;
        expect(constructorItems).toEqual(expectedSortResultAfterDeleteIngredient);
    });

    test("test reducer for move forward ingredient", () => {
        const initialBurgerConstructorState = mockInitialBurgerConstructorState;
        const newState = burgerConstructorReducer(initialBurgerConstructorState, moveForwardIngredient(1));
        const { constructorItems } = newState;
        expect(constructorItems).toEqual(expectedSortResultAfterMoveForwardIngredient);
    });

    test("test reducer for move back ingredient", () => {
        const initialBurgerConstructorState = mockInitialBurgerConstructorState;
        const newState = burgerConstructorReducer(initialBurgerConstructorState, moveBackIngredient(1));
        const { constructorItems } = newState;
        expect(constructorItems).toEqual(expectedSortResultAfterMoveBackIngredient);
    });

    test("test reset constructor items", () => {
        const initialBurgerConstructorState = mockInitialBurgerConstructorState;
        const newState = burgerConstructorReducer(initialBurgerConstructorState, resetConstructorItems());
        const { constructorItems } = newState;
        expect(constructorItems).toEqual({
            bun: null,
            ingredients: []
        });
    });
});


