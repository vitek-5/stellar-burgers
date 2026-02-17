/// <reference types="cypress" />

Cypress.Commands.add(
  'setAuthTokens',
  (accessToken: string, refreshToken: string) => {
    cy.setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
);

Cypress.Commands.add('clearAuthTokens', () => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

Cypress.Commands.add('addIngredientById', (id: string) => {
  cy.get(`[data-cy="ingredient-${id}"]`).find('button').click();
});

Cypress.Commands.add(
  'openIngModalAndCheckName',
  (id: string, expectedName: string) => {
    cy.get(`[data-cy="ingredient-${id}"]`).click();
    cy.get('[data-cy="ingredient-modal"]').should('exist');
    cy.contains(expectedName).should('exist');
  }
);

Cypress.Commands.add(
  'closeModalByType',
  (typeClose: string, modalName: string, options = {}) => {
    cy.get(`[data-cy="${typeClose}"]`).click(options);
    cy.get(`[data-cy="${modalName}-modal"]`).should('not.exist');
  }
);

Cypress.Commands.add('checkIngredientInConstructor', (place, isNameContain) => {
  cy.get(`[data-cy="constructor-${place}"]`)
    .contains(isNameContain)
    .should('exist');
});
