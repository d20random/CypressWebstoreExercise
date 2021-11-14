describe('Tests for Items Listed counter', () => {
    
    it('Testing the Product(s) Found listing counter', () => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/').get('#root').should('be.visible');
    const $size1='XXL', $size2='M'; // predefine the filters we'll be clicking
    cy.get('[class="shelf-item__title"]').then($elements => {
    var $maxItems = $elements.length; // gets max number of products listed

    /* using strict have.text checking for final checks so favourably formatting the key string */
    const $maxItemsString = $maxItems + " Product(s) found.";

    cy.get('[class="filters-available-size"]').contains($size2).should('be.visible').click();
    cy.get('[class="filters-available-size"]').contains($size1).should('be.visible').click();
    cy.wait(500);  // wait for render

    cy.get('[class="shelf-item__buy-btn"]').should('be.visible').then($elements => {
    var $nowItems = $elements.length; // gets current number of products listed
    const $nowItemsString = $nowItems + " Product(s) found.";
    cy.get('[class="products-found"]').should('have.text', $nowItemsString );
    })
    
    cy.get('[class="filters-available-size"]').contains($size2).should('be.visible').click();
    cy.wait(500)

    cy.get('[class="shelf-item__buy-btn"]').should('be.visible').then($elements => {
    var $nowItems = $elements.length;
    const $nowItemsString = $nowItems + " Product(s) found.";
    cy.get('[class="products-found"]').should('have.text', $nowItemsString );
    })

    /* reset to default and verify full list count */
    cy.get('[class="filters-available-size"]').contains($size1).should('be.visible').click();
    cy.get('[class="products-found"]').should('have.text', $maxItemsString );
    
    })                                                           
})
})