// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Устанавливает фейковые токены авторизации
     * @example cy.setAuthTokens('abc', 'xyz')
     */
    setAuthTokens(accessToken: string, refreshToken: string): void;

    /**
     * Очищает токены авторизации
     * @example cy.clearAuthTokens()
     */
    clearAuthTokens(): void;

    /**
     * Добавляет ингредиент в конструктор по ID
     * @example cy.addIngredientById('1')
     */
    addIngredientById(id: string): void;

    /**
     * Открывает модальное окно ингредиента и проверяет название
     * @example cy.openIngModalAndCheckName('2', 'Биокотлета из марсианской Магнолии')
     */
    openIngModalAndCheckName(id: string, expectedName: string): void;

    /**
     * Закрывает модальное окно по типу триггера (кнопка или оверлей)
     * @param typeClose — значение data-cy кнопки закрытия (например, 'modal-close' или 'modal-overlay')
     * @param modalName — имя модального окна (например, 'ingredient' → ищет [data-cy="ingredient-modal"])
     * @param options — опции клика (например, { force: true })
     * @example cy.closeModalByType('modal-overlay', 'ingredient', { force: true })
     */
    closeModalByType(
      typeClose: string,
      modalName: string,
      options?: Partial<Cypress.ClickOptions>
    ): void;

    checkIngredientInConstructor(place: string, isNameContain: string): void;
  }
}
