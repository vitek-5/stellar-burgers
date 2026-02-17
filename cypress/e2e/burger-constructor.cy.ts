describe('Конструктор', () => {
  const accessToken = 'fake-access-token';
  const refreshToken = 'fake-refresh-token';

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setAuthTokens(accessToken, refreshToken);

    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearAuthTokens();
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.addIngredientById('1');
    cy.checkIngredientInConstructor('bun', 'Краторная булка N-200i');

    cy.addIngredientById('2');
    cy.checkIngredientInConstructor(
      'ingredient-2',
      'Биокотлета из марсианской Магнолии'
    );

    cy.addIngredientById('3');
    cy.checkIngredientInConstructor(
      'ingredient-3',
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('должен открывать и закрывать модальные окна', () => {
    cy.openIngModalAndCheckName('1', 'Краторная булка N-200i');
    cy.closeModalByType('modal-overlay', 'ingredient', { force: true });

    cy.openIngModalAndCheckName('2', 'Биокотлета из марсианской Магнолии');
    cy.closeModalByType('modal-close', 'ingredient');

    cy.openIngModalAndCheckName('3', 'Филе Люминесцентного тетраодонтимформа');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.addIngredientById('1');
    cy.addIngredientById('2');

    cy.get('[data-cy="order-button"]').click();
    cy.wait('@postOrder');

    cy.get('[data-cy="order-modal"]').should('exist');
    cy.get('[data-cy="order-number"]').contains('100898');

    cy.closeModalByType('modal-close', 'order');

    cy.get('[data-cy="constructor-bun"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredient-2"]').should('not.exist');
  });
});
