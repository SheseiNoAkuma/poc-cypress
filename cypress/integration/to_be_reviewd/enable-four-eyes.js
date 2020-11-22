/// <reference types="Cypress" />
describe('Four eyes', function () {
    it('Visits NG', function () {
    
        cy.visit(Cypress.env('fin-cdp') + '/fin-web-console/?locale=it');

        cy.contains('Amministrazione').click().should('have.class', 'gwt-MenuItem-selected');
        cy.contains('Gestione Ruoli').click();

        cy.get('.gwt-MenuBar-horizontal').contains('Amministrazione');
        cy.get('.gwt-MenuBar-horizontal').contains('Preferenze');
    

        cy.contains('ADMINISTRATOR').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-CheckBox input').not(':checked').click({ multiple: true , force: true});
        cy.get('[title="Aggiorna"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        
        cy.wait(2000);

        cy.contains('APPROVER').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-CheckBox input').not(':checked').click({ multiple: true , force: true});
        cy.get('[title="Aggiorna"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();


        cy.visit('/fin-web-console/?username=APPROVER&locale=it');
        cy.contains('Amministrazione').click().should('have.class', 'gwt-MenuItem-selected');
        cy.contains('Ruoli').click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('[title="Autorizza"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        cy.wait(2000);
        cy.contains('APPROVER').click();
        cy.get('[title="Autorizza"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.visit('/fin-web-console/?username=ADMINISTRATOR&locale=it');
        cy.get('.gwt-MenuBar-horizontal tr td').spread(($monitor,$suspmess,$report,$dataentry,$config,$tools,$admin,$pref)=>{
            
            //-----------------------MONITOR ASSERTIONS---------------------------
            cy.wrap($monitor).should('have.text','Monitoraggio');
            cy.wrap($monitor).click();
            cy.get('.gwt-MenuBarPopup tr td.menuPopupMiddleCenter').then((item1)=>{
                cy.wrap(item1).should('have.text','Ricerca trasferimenti');
            });

            //-----------------------SUSPENDED MESSAGES ASSERTIONS----------------
            cy.wrap($suspmess).should('have.text','Messaggi Sospesi');
            cy.wrap($suspmess).click();
            cy.wrap($suspmess).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2)=>{
                cy.wrap($item1).should('have.text','Pannello Operativo');
                cy.wrap($item2).should('have.text','Messaggi Sospesi');            
            });
            
            //-----------------------REPORT ASSERTIONS----------------------------
            cy.wrap($report).should('have.text','Report');
            
            //-----------------------DATA ENTRY ASSERTIONS------------------------
            cy.wrap($dataentry).should('have.text','Data Entry');
            cy.wrap($dataentry).click();
            cy.wrap($dataentry).click();
            cy.get('.gwt-MenuBarPopup tr td.menuPopupMiddleCenter tr').spread(($item1,$item2)=>{
                cy.wrap($item1).should('have.text','Creazione messaggio');
                cy.wrap($item2).should('have.text','Gestione template messaggi');
            });

            
            //----------------------CONFIG ASSERTIONS-----------------------------
            cy.wrap($config).should('have.text','Configurazioni');
            cy.wrap($config).click();
            cy.wrap($config).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2,$item3)=>{
                cy.wrap($item1).should('have.text','Lista configurazioni');
                cy.wrap($item2).should('have.text','Lista Risorse');
                cy.wrap($item3).should('have.text','Modifica configurazione attiva');
            });

            //----------------------TOOLS ASSERTIONS------------------------------
            cy.wrap($tools).should('have.text','Strumenti');
            cy.wrap($tools).click();
            cy.wrap($tools).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').then((element)=>{
                cy.wrap(element).should('have.text','MQ Dumper');
            });

            //----------------------ADMINISTRATION TOOLS--------------------------
            cy.wrap($admin).should('have.text','Amministrazione');
            cy.wrap($admin).click();
            cy.wrap($admin).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2,$item3,$item4,$item5,$item6,$item7)=>{
                cy.wrap($item1).should('have.text','Gestione Ruoli');
                cy.wrap($item2).should('have.text','Audit Utente');
                cy.wrap($item3).should('have.text','Partecipanti');
                cy.wrap($item4).should('have.text','Gestione Organizzazioni');
                cy.wrap($item5).should('have.text','Gestione Contesti');
                cy.wrap($item6).should('have.text','Bic');
                cy.wrap($item7).should('have.text','Report di sicurezza');
            })

            cy.wrap($pref).should('have.text','Preferenze');
            cy.wrap($pref).click();
            cy.wrap($pref).click();
            cy.get('.gwt-MenuBarPopup tr.menuPopupMiddle td.menuPopupMiddleCenter .menuPopupContent').then((Element)=>{
                cy.wrap(Element).should('have.text','Preferenze');    
            });
        });
    })
})