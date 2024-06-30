const baseUrl = 'http://localhost:4000/';

function getIngredientFilling() {
  return cy.get('[data-testid="643d69a5c3f7b9001cfa0941"]');
}
function getIngredientBun() {
  return cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
}
function getModal() {
  return cy.get('[data-testid="modal"]');
}
function getListFililing() {
  return cy.get('[data-testid="list-filling"]');
}
function closeModal() {
  // Клик по крестику для закрытия модального окна
  cy.get('[data-testid="bttn-close-modal"]').click(); 
  // Проверка, что элемента модального окна нет в DOM
  getModal().should('not.exist');
}

describe('Тестирование добавления ингредиента из списка в конструктор', function() {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: "ingredients.json",
    });
    cy.visit(baseUrl);
  });

  it('Добавление ингредиентов начинки в конструктор', function() {
    //выбираем элемент кнопки ингредиента для добавления в конструктор
    getIngredientFilling().children().last().as('bttnAddIngredient');
    //выбираем элемент параграфа ингредиента, содержащего название ингредиента в textConten
    getIngredientFilling().find('[data-testid="name-ingredient"]').as('name-ingredient');
    //кликаем на кнопку
    cy.get('@bttnAddIngredient').click();
    //достаем текстовое содержимое с названием нашего ингредиента,
    //далее проверяем наличие элемента в конструкторе, с аналогичным тестовым содержимым
    cy.get('@name-ingredient').invoke('text').then((text) => {
    //теперь переменная 'text' содержит текстовое содержимое элемента
      getListFililing().contains(text);
    });
    //проверяем количество ингредиентов, добавленых в конструктор, после одного добавления
    getListFililing().children().should('have.length', 1);
    //повторно кликаем на кнопку
    cy.get('@bttnAddIngredient').click();
    //проверяем количество ингредиентов, добавленых в конструктор, после двух добавлений
      getListFililing().children().should('have.length', 2);
  });

  it('Добавление булок в конструктор', function() {
    //выбираем элемент кнопки ингредиента для добавления в конструктор
    getIngredientBun().children().last().as('bttnAddIngredient');
    //выбираем элемент параграфа ингредиента, содержащего название ингредиента в textConten
    getIngredientBun().find('[data-testid="name-ingredient"]').as('name-ingredient');
    //кликаем на кнопку
    cy.get('@bttnAddIngredient').click();
    //достаем текстовое содержимое с названием нашего ингредиента,
    //далее проверяем наличие элемента в конструкторе, с аналогичным тестовым содержимым
    cy.get('@name-ingredient').invoke('text').then((text) => {
    //проверяем наличие соответствующего названия ингредиента, в элементе верхней булки конструктора
      cy.get('[data-testid="top-bun"]').contains(text);
    });
    cy.get('@name-ingredient').invoke('text').then((text) => {
      //проверяем наличие соответствующего названия ингредиента, в элементе нижней булки конструктора
        cy.get('[data-testid="bottom-bun"]').contains(text);
      });
  });
  
  });

describe('Проверяем работy модального окона', function() {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: "ingredients.json",
    });
    cy.visit(baseUrl);
  });

  it('Открытие модального окна ингредиента', function() {
    //выбираем элемент ингредиента для клика
    getIngredientFilling().children('.J2V21wcp5ddf6wQCcqXv').click();
    // Проверяем, что модальное окно открылось
    getModal().should('be.visible');
    //проверяем содержимое модального окна, на предмет ингредиента
    getModal().contains('Биокотлета из марсианской Магнолии');
  });

  it('Закрытие модального окна по клику на крестик', function() {
    //выбираем элемент ингредиента для клика
    getIngredientFilling().children('.J2V21wcp5ddf6wQCcqXv').click();
    // Проверка, что модальное окно открылось
    getModal().should('be.visible');
    closeModal();
  });

  it('Закрытие модального окна по клику на оверлей', function() {
    //выбираем элемент ингредиента для клика
    getIngredientFilling().children('.J2V21wcp5ddf6wQCcqXv').click();
    // Проверка, что модальное окно открылось
    getModal().should('be.visible');
    // Клик по крестику для закрытия модального окна
    cy.get('[data-testid="overlay"]').click({force: true}); 
    // Проверка, что элемента модального окна нет в DOM
    getModal().should('not.exist');
  });
});

describe('Тест на создание заказа', function() {
  
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orderBurger.json' }).as('order');
    cy.setCookie(
      'accessToken',
      'Bearer11111JhbGci11JIUzI1Ni111111111111111111.111111111111111111DA2NmI1NiIsI111111111111111111xNzEzNzA11111.Tr111111111111111111_111111111111111111bmCt_11111'
    );
    localStorage.setItem(
      'refreshToken',
      '11111111111a3c4d31110a32ac9e05360c32af5e7e521111fc98244908a86130e72d0d5a11111111'
    );
    cy.visit(baseUrl);
  });

  it('Тест на сборку бургера и подтверждения заказа', function () {
    //Cобирем бургер
    getIngredientBun().children().last().as('bttnAddIngredientBun');
    getIngredientFilling().children().last().as('bttnAddIngredientFilling');
    cy.get('@bttnAddIngredientBun').click();
    cy.get('@bttnAddIngredientFilling').click();
    //Жмем на кнопку "Оформить заказ"
    cy.get('[data-testid="checkout"]').click();
    getModal().should('be.visible');
    //извлекаем номер заказа из ответа и проверяем, что модальное окно открылось и номер заказа верный
    cy.wait('@order').then((orderData) => {
      const number = orderData.response?.body.order.number;
      cy.get('[data-testid="orderNumber"]').contains(number);
    });
    closeModal();
  });

  describe('Проверяем, что конструктор пуст', function() {
    it('Булка не добавлена в конструктор', function () {
      cy.get('[data-testid="top-blank"]').should('exist');
      cy.get('[data-testid="top-blank"]').should('be.visible');
      cy.get('[data-testid="bottom-blank"]').should('exist');
      cy.get('[data-testid="bottom-blank"]').should('be.visible');
    });
    it('Начинка не добавлена в конструктор', function () {
      //Один элемент
      getListFililing().children().should('have.length', 1);
      //Этот один элемент - элемент заготовки начинки, он в DOM, видим
      getListFililing().children('[data-testid="filling-blank"]').should('exist').should('be.visible');
    });
    it('Сумма заказа в конструкторе равна 0', function () {
        //Сумма равна 
        cy.get('[data-testid="price-constructor"]').contains(0);
    });
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
