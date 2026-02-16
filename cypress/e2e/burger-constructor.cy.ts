describe('Конструктор', () => {
  const accessToken = 'fake-access-token';
  const refreshToken = 'fake-refresh-token';

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    });

    cy.setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="constructor-bun"]').should('exist');

    cy.get('[data-cy="ingredient-2"]').find('button').click();
    cy.get('[data-cy="constructor-ingredient-2"]').should('exist');

    cy.get('[data-cy="ingredient-3"]').find('button').click();
    cy.get('[data-cy="constructor-ingredient-3"]').should('exist');
  });

  it('должен открывать и закрывать модальные окна', () => {
    cy.get('[data-cy="ingredient-1"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-1"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="ingredient-2"]').find('button').click();

    cy.get('[data-cy="order-button"]').click();

    cy.get('[data-cy="order-modal"]').should('be.visible');

    cy.get('[data-cy="order-number"]').contains('100898');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="order-modal"]').should('not.exist');

    cy.get('[data-cy="constructor-bun"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredient-2"]').should('not.exist');
  });
});
