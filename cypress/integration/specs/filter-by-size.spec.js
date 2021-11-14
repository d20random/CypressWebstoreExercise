describe('Filtering by Size and checking Results found', () => {

        it('Visit page and Verify root and filter manu are loaded', () => {
                cy.visit('https://react-shopping-cart-67954.firebaseapp.com/').get('#root').should('be.visible');
                cy.get('[class="filters-available-size"]').should('exist');
        })
   
    
        it('CLicks size filter by ID, looks at cart to verify added item is right size', () => {
            const $shirtSize='XS';
            cy.get('[class="filters-available-size"]').contains($shirtSize).should('be.visible').click();
            
            /* adds the first element after filtering to the cart, only the cart fetches proper size attribute */
            cy.get('[class="shelf-item__buy-btn"]').eq(0).should('be.visible').click();

            /* compares the filter setting to the size attribute of the item in cart */
            cy.get('[class="shelf-item__details"]').eq(0).should('contain.text', "S |"); // Test should fail, item is (S) this is a bug!
            cy.get('[class="filters-available-size"]').contains($shirtSize).should('be.visible').click(); // Resets Checkbox
        })
        


    })