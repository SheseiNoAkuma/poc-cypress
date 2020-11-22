/// <reference types="Cypress" />
Cypress.on('uncaught:exception',(err,runnable)=>{
    return false;
});

describe('Four eyes', function () {
    it('Resets skills for admin and approver (keycloak)', function () {

        let keywords_en = Cypress.env('message')[Cypress.env('extralocale')];
    
        cy.visit(Cypress.env('fin-open') + '/fin-web-console/');           
        cy.get('#username').focus().type("ngadmin");
        cy.get('#password').focus().type("NGadmin1");
        cy.get('.form-item > .pull-right').click();

        cy.contains(keywords_en.admin).click().should('have.class','gwt-MenuItem-selected');
        cy.contains(keywords_en.roles).click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-Label').not(':contains(Profile Management)').then((label)=>{
        cy.wrap(label).parent().find('.gwt-CheckBox input').then((input)=>{
            cy.wrap(input).should('be.checked').uncheck({force:true});
        });
        });
        cy.get('[title="Update"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.wait(1000);

        cy.contains('APPROVER').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-Label').not(':contains(Profile Management)').then((label)=>{
            cy.wrap(label).parent().find('.gwt-CheckBox input').then((input)=>{
                cy.wrap(input).should('be.checked').uncheck({force:true});
            });
        });
        cy.get('[title="Update"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.get('#user-image').click({force:true});
        cy.get('.gwt-Anchor').click();

        cy.get('#username').focus().type("ngapprover");
        cy.get('#password').focus().type("NGapprover1");
        cy.get('.form-item > .pull-right').click();

        cy.contains(keywords_en.admin).click().should('have.class','gwt-MenuItem-selected');
        cy.contains(keywords_en.roles).click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('[title="Authorize"] > .gwt-Image').click();
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        cy.wait(1000);
        cy.contains('APPROVER').click();
        cy.get('[title="Authorize"] > .gwt-Image').click();
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        
        cy.get('#user-image').click({force:true});
        cy.get('.gwt-Anchor').click();

        cy.get('#username').focus().type("ngadmin");
        cy.get('#password').focus().type("NGadmin1");
        cy.get('.form-item > .pull-right').click();

        cy.get('.gwt-MenuBar-horizontal tr td').spread(($adminItem,$prefItem)=>{

            cy.wrap($adminItem).should('have.text',keywords_en.admin);
            cy.wrap($adminItem).click();
            cy.get('.gwt-MenuBarPopup td .menuPopupContent').then((rolesItem) => {
                cy.wrap(rolesItem).should('have.text',keywords_en.roles);
            });
            cy.wrap($prefItem).should('have.text',keywords_en.preferences);
            cy.wrap($prefItem).click();
            cy.wrap($prefItem).click();
            cy.get('.gwt-MenuBarPopup tr.menuPopupMiddle td.menuPopupMiddleCenter .menuPopupContent').then((Element)=>{
                cy.wrap(Element).should('have.text',keywords_en.preferences);    
            });
        });

        cy.get('#user-image').click();
        cy.get('.gwt-Anchor').click();
    })
})