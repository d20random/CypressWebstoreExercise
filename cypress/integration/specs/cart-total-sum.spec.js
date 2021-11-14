describe('Tests item prices and operations in listing, cart and on checkout ', () => {

        it('Visit page and verify shopping cart is loaded', () => {
    
                cy.visit('https://react-shopping-cart-67954.firebaseapp.com/').get('#root').should('be.visible');
                cy.get('[class*="float-cart"]').should('exist'); })

        it('Ensures defaults are empty and zero', () => {
        
            /*opens cart, verifies it's empty */
            cy.get('[class*="float-cart-closed"]').should('be.visible').click();
            cy.get('[class="shelf-empty"]').should('be.visible');

            /* cart total should be zero, then close RHS cart panel */
            cy.get('.sub-price__val').should('have.text', "$ 0.00");
            cy.get('[class="float-cart__close-btn"]').should('be.visible').click();  
        })
    
        it('Adds a random item to the shopping cart and Validates List and Cart prices are identical', () => {
            
            /* selects a random shirt */
            cy.get('[class="shelf-item__title"]').then($elements => {
                var $maxItems = $elements.length;
            const $randomShirtID=Math.floor(Math.random() * $maxItems);
            cy.get('[class="shelf-item__buy-btn"]').eq($randomShirtID).should('be.visible').click();
            cy.wait(500);

            cy.get('.float-cart__shelf-container > .shelf-item > .shelf-item__price').eq(0).then(($cartPrice) => {
                cy.get('[class="shelf-item"] > .shelf-item__price > .val').eq($randomShirtID).then(($shelfPrice) => {
                
                    /* valueBox to Number could be a custom command */
                const $cartPriceNormal = $cartPrice.text().replace(/[^\d]/g, '');
                    const $cartPriceNumber = $cartPriceNormal/100;
                const $shelfPriceNormal = $shelfPrice.text().replace(/[^\d]/g, '');
                    const $shelfPriceNumber = $shelfPriceNormal/100; // sometimes flakey due to long rounding, cut off to 2-3 decimals 

                expect($cartPriceNumber).to.eq($shelfPriceNumber); 
             
            /* end this test here to continue testing prices with previously added item */    

            }) })  })

        })
            it('Looks at added item and compares price to total and Checkout total', () => {
        
                cy.get('.float-cart__close-btn').should('be.visible');
                cy.get('.float-cart__shelf-container > .shelf-item > .shelf-item__price').eq(0).then(($itemPrice) => {
                cy.get('p.sub-price__val').eq(0).then(($totalPrice) => {
                
                const $itemPriceNormal = $itemPrice.text().replace(/[^\d]/g, '');
                    const $itemPriceNumber = $itemPriceNormal/100; 
                const $totalPriceNormal = $totalPrice.text().replace(/[^\d]/g, '');
                    const $totalPriceNumber = $totalPriceNormal/100;
                expect($itemPriceNumber).to.eq($totalPriceNumber); 
                
                /* adds another of same item, total sum should double */
                cy.get('[class="change-product-button"]').eq(1).should('be.enabled').click();
                cy.get('[class*="quantity"]').should('have.text', 2);
                var $multiTotal = $totalPriceNumber+$itemPriceNumber;
                cy.get('p.sub-price__val').eq(0).should('contain.text', $multiTotal);   
                
                /* go for three */
                cy.get('[class="change-product-button"]').eq(1).should('be.enabled').click();
                cy.get('[class*="quantity"]').should('contain.text', 3);
                $multiTotal+=$itemPriceNumber;
                cy.get('p.sub-price__val').eq(0).should('contain.text', $multiTotal);  
                
                /* time to checkout and confirm the same total price in Checkout alert*/
                cy.get('.buy-btn').click();
                cy.on('window:alert', (text) => {
                    expect(text).to.contains($multiTotal);
                                      });

            }) }) 
            
               
        })  
    })