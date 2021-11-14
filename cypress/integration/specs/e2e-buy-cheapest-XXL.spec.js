describe('E2E scenario: Find the cheapest Black T-Shirt available and buy three of it', () => {

        it('Visit page and Verify root and store front are loaded', () => {
                cy.visit('https://react-shopping-cart-67954.firebaseapp.com/').get('#root').should('be.visible');
                cy.get('[class="shelf-item__title"]').should('exist');
        })
   
    
        it('Clicks Order by Lowest, confirms all items are still visible', () => {
            
            /* checks if same amount of Products are still available after reorder, trusts ordering mechanism */

            cy.get('[class="shelf-item__title"]').then($elements => {
            var $maxItems = $elements.length;
            const $maxItemsString = $maxItems + " Product(s) found."; 
            cy.get('[class="products-found"]').should('have.text', $maxItemsString);
            cy.get('select').select('lowestprice');
            cy.wait(500); // wait for render
            cy.get('[class="products-found"]').should('have.text', $maxItemsString);
        }) })
    
        it('Finds the cheapest Black XXL Shirts, verifies in cart', () => {
            const $shirtSize='XXL';
            const $sizeString = 'X |'; // hack to enable bugged component to work
            cy.get('[class="filters-available-size"]').contains($shirtSize).should('be.visible').click();
            cy.wait(1000);
            
            /* clicks the first Black T-shirt after filtering */
            cy.get('[class="shelf-item__title"]').contains("Black").click();

            /* Checks cart to make sure it's Black and XXL */
            cy.get('[class="shelf-item__details"]').eq(0).should('contain.text', $sizeString); 
            cy.get('[class="shelf-item__details"]').eq(0).should('contain.text', "Black");
            
        })
        
        it('Adds two more of the same shirt, confirms total of three', () => {
            
            /* could be generalized, ideally for a random or pre-determined number */
            cy.get('[class*="quantity"]').should('contain.text', 1);
            cy.get('[class="change-product-button"]').eq(1).should('be.enabled').click().click();
            cy.get('[class*="quantity"]').should('contain.text', 3);
                  
         })
                        
        it('Checks out with the selection', () => {
            /* hit Checkout button, confirm checkout alert is received */
            cy.get('.buy-btn').click();
            cy.on('window:alert', (text) => {
                expect(text).to.contains("Checkout -");
                                  });
                        
        })
    })