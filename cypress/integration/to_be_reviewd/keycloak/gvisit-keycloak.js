 describe('Four eyes', function () {
    it('Resets skills for admin and approver (keycloak)', function () {
        cy.visit(Cypress.env('keycloak'));

                cy.contains('Administration Console').click();

                cy.get('#username').focus().type('admin');
                cy.get('#password').focus().type('admin');
                cy.get('#kc-login').click();

                cy.contains('Users').click();
                cy.get('#viewAllUsers').click();
                cy.get('#user-table .ng-scope td .ng-binding').spread(($item1,$item2,$item3)=>{

                    cy.wrap($item2).should('have.text','75fb0f7f-39f6-401c-9593-9739d1e9a95f');
                    cy.wrap($item2).click();

                    cy.wait(1000);

                    cy.contains('Sessions').click();
                    cy.get('#logoutAllSessions').click();
                });

                cy.contains('Users').click();

                cy.get('#user-table .ng-scope td .ng-binding').spread(($item1,$item2,$item3)=>{

                    cy.wrap($item3).should('have.text','6a74a807-c497-4aea-9d93-66ffc1222e06');
                    cy.wrap($item3).click();

                    cy.wait(1000);

                    cy.contains('Sessions').click();
                    cy.get('#logoutAllSessions').click();
                });

                cy.contains('Admin').click();
                cy.contains('Sign Out').click();
    })
});