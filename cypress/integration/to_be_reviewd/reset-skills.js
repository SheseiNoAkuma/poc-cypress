/// <reference types="Cypress" />
describe('reset skills', function(){
    it('resets skills', function(){
        cy.visit(Cypress.env('fin-cdp') + '/fin-web-console/?locale=it');
        cy.contains('Amministrazione').click().should('have.class','gwt-MenuItem-selected');
        cy.contains('Gestione Ruoli').click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-Label').not(':contains(Gestione Profili)').then((label)=>{
        cy.wrap(label).parent().find('.gwt-CheckBox input').then((input)=>{
            cy.wrap(input).should('be.checked').uncheck({force:true});
        });
        });
        cy.get('[title="Aggiorna"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.wait(1000);

        cy.contains('APPROVER').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-Label').not(':contains(Gestione Profili)').then((label)=>{
            cy.wrap(label).parent().find('.gwt-CheckBox input').then((input)=>{
                cy.wrap(input).should('be.checked').uncheck({force:true});
            });
        });
        cy.get('[title="Aggiorna"] > .gwt-Image').click();
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.visit('/fin-web-console/?username=APPROVER&locale=it');
        cy.contains('Amministrazione').click().should('have.class','gwt-MenuItem-selected');
        cy.contains('Gestione Ruoli').click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('[title="Autorizza"] > .gwt-Image').click();
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        cy.wait(1000);
        cy.contains('APPROVER').click();
        cy.get('[title="Autorizza"] > .gwt-Image').click();
        cy.get('.gwt-PushButton .html-face').contains('Ok').click(); 

        cy.visit('/fin-web-console/?username=ADMINISTRATOR&locale=it');
        cy.get('.gwt-MenuBar-horizontal td').spread(($adminItem, $prefItem) => {
            cy.wrap($adminItem).should('have.text','Amministrazione');
            cy.wrap($adminItem).click();
            cy.get('.gwt-MenuBarPopup td .menuPopupContent').then((rolesItem) => {
                cy.wrap(rolesItem).should('have.text','Gestione Ruoli');
            });
            cy.wrap($prefItem).should('have.text','Preferenze');
            cy.wrap($prefItem).click();
            cy.wrap($prefItem).click();
            cy.get('.gwt-MenuBarPopup tr.menuPopupMiddle td.menuPopupMiddleCenter .menuPopupContent').then((Element)=>{
                cy.wrap(Element).should('have.text','Preferenze');    
            });
        });
        
        
    })
})