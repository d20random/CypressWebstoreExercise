describe('Shopping Cart tests: Adds and removes items, quantity changes and cart interface ', () => {

        it('Visit page and verify shopping cart is loaded', () => {
    
            cy.visit('https://react-shopping-cart-67954.firebaseapp.com/').get('#root').should('be.visible');
            cy.get('[class*="float-cart"]').should('exist');        
        })

        it('Verifies shopping cart default states and collapse/uncollapse actions', () => {
    
            /* locates and clicks cart icon to open RHS cart panel*/
            cy.get('[class*="float-cart-closed"]').should('be.visible').click();

            /*confirms the cart is empty using the shelf-empty class*/
            cy.get('[class="shelf-empty"]').should('be.visible');

            /* then clicks cart close button to collapse the RHS cart panel */
            cy.get('[class="float-cart__close-btn"]').should('be.visible').click();
            
            
            })
        it('Adds item by ID in cart, verifies cart items counter, removes item from cart', () => {
    
            var $itemID = 'Cat Tee Black T-Shirt';
            
            /* finds the first element matching itemID param and adds it to cart */
            cy.get('[class="shelf-item__title"]').contains($itemID).click();

            /* confirms the correct item has been added to cart */
            cy.get('[class="float-cart__shelf-container"]').eq(0).should('contain.text', $itemID);

            /* confirms the numbers of items in bag is now 1 */
            cy.get('[class*="quantity"]').should('have.text', 1);

            /*negative test: confirms empty shelf message is not visible when items are in cart */
            cy.get('[class="shelf-empty"]').should('not.exist');

            /* negative test: confirms remove - button is disabled when no items are in cart and disabled otherwise */
            cy.get('[class="change-product-button"]').eq(0).should('be.disabled');

            /* walks quantity button up and down */
            cy.get('[class="change-product-button"]').eq(1).should('be.enabled').click();
            cy.get('[class*="quantity"]').should('have.text', 2);
            cy.get('[class="change-product-button"]').eq(0).should('be.enabled').click();
            cy.get('[class*="quantity"]').should('have.text', 1);
            
            /* adds another different item to cart by DOM array selector*/
            cy.get('[class="shelf-item__title"]').eq(1).should('not.have.text',$itemID).click({force: true});
            cy.get('[class*="quantity"]').should('have.text', 2);

            /* deletes the items from cart by clicking their respective corner x buttons, verifies counter state */
            cy.get('[class="shelf-item__del"]').eq(1).click()
            cy.get('[class*="quantity"]').should('have.text', 1);

            cy.get('[class="shelf-item__del"]').eq(0).click();
            cy.get('[class*="quantity"]').should('have.text', 0);
            cy.get('[class="shelf-empty"]').should('be.visible'); // verify empty state at end
            
                })
    
    })