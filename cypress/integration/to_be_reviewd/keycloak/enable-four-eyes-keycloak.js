/// <reference types="Cypress" />
Cypress.on('uncaught:exception',(err,runnable)=>{
    return false;
});

describe('Four eyes', function () {
    it('Enables four eyes for keycloak', function () {
        
        let keywords_en = Cypress.env('message')[Cypress.env('extralocale')];

        cy.visit(Cypress.env('fin-open') + '/fin-web-console/');           
        cy.get('#username').focus().type("ngadmin");
        cy.get('#password').focus().type("NGadmin1");
        cy.get('.form-item > .pull-right').click();

        cy.contains(keywords_en.admin).click().should('have.class', 'gwt-MenuItem-selected');
        cy.contains(keywords_en.roles).click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-CheckBox input').not(':checked').click({ multiple: true , force: true});
        cy.get('[title="Update"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        
        cy.wait(2000);

        cy.contains('APPROVER').click();
        cy.get('.gwt-TreeItem > .treeItemSelectable > .gwt-CheckBox input').not(':checked').click({ multiple: true , force: true});
        cy.get('[title="Update"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
    
        cy.get('#user-image').click({force:true});
        cy.get('.gwt-Anchor').click();

        cy.get('#username').focus().type("ngapprover");
        cy.get('#password').focus().type("NGapprover1");
        cy.get('.form-item > .pull-right').click();

        cy.contains(keywords_en.admin).click().should('have.class', 'gwt-MenuItem-selected');
        cy.contains(keywords_en.roles).click();

        cy.contains('ADMINISTRATOR').click();
        cy.get('[title="Authorize"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();
        cy.wait(2000);
        cy.contains('APPROVER').click();
        cy.get('[title="Authorize"] > .gwt-Image').click({force:true});
        cy.get('.gwt-PushButton .html-face').contains('Ok').click();

        cy.get('#user-image').click();
        cy.get('.gwt-Anchor').click();

        cy.get('#username').focus().type("ngadmin");
        cy.get('#password').focus().type("NGadmin1");
        cy.get('.form-item > .pull-right').click();

        cy.get('.gwt-MenuBar-horizontal tr td').spread(($monitor,$suspmess,$report,$dataentry,$config,$sag,$rma,$findriver,$tools,$admin,$pref)=>{
            
            //-----------------------MONITOR ASSERTIONS---------------------------
            cy.wrap($monitor).should('have.text',keywords_en.monitor);
            cy.wrap($monitor).click();
            cy.get('.gwt-MenuBarPopup tr td.menuPopupMiddleCenter .menuPopupContent tr td').spread(($item1)=>{
                //cy.wrap($item1).should('have.text',keywords_en.dashboard);
                cy.wrap($item1).should('have.text',keywords_en.transfers);
            });

            //-----------------------SUSPENDED MESSAGES ASSERTIONS----------------
            cy.wrap($suspmess).should('have.text',keywords_en.messages);
            cy.wrap($suspmess).click();
            cy.wrap($suspmess).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2)=>{
                cy.wrap($item1).should('have.text',keywords_en.panel);
                cy.wrap($item2).should('have.text',keywords_en.messages);            
            });
            
            //-----------------------REPORT ASSERTIONS----------------------------
            cy.wrap($report).should('have.text',keywords_en.report);
            
            //-----------------------DATA ENTRY ASSERTIONS------------------------
            cy.wrap($dataentry).should('have.text',keywords_en.data);
            cy.wrap($dataentry).click();
            cy.wrap($dataentry).click();
            cy.get('.gwt-MenuBarPopup tr td.menuPopupMiddleCenter tr').spread(($item1,$item2)=>{
                cy.wrap($item1).should('have.text',keywords_en.msg_creation);
                cy.wrap($item2).should('have.text',keywords_en.msg_tmp_management);
            });

            
            //----------------------CONFIG ASSERTIONS-----------------------------
            cy.wrap($config).should('have.text',keywords_en.config);
            cy.wrap($config).click();
            cy.wrap($config).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2,$item3)=>{
                cy.wrap($item1).should('have.text',keywords_en.config_list);
                cy.wrap($item2).should('have.text',keywords_en.res_list);
                cy.wrap($item3).should('have.text',keywords_en.active_config);
            });


            //----------------------SAG DRIVER ASSERTIONS-------------------------
            cy.wrap($sag).should('have.text',keywords_en.sag);
            cy.wrap($sag).click();
            cy.wrap($sag).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2)=>{
                //cy.wrap($item1).should('have.text',keywords_en.event_subscription);
                cy.wrap($item1).should('have.text',keywords_en.channels_console);
                cy.wrap($item2).should('have.text',keywords_en.suspended_transf);
            });

            //----------------------RMA ASSERTIONS--------------------------------
            cy.wrap($rma).should('have.text',keywords_en.rma);
            cy.wrap($rma).click();
            cy.wrap($rma).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr').spread(($item1,$item2,$item3)=>{

                cy.wrap($item1).should('have.text',keywords_en.authorisations);
                cy.wrap($item1).click();
                cy.wrap($item1).click();
                cy.contains(keywords_en.authorisations);
                cy.contains(keywords_en.pending)

                cy.wrap($item2).should('have.text',keywords_en.queries);
                cy.wrap($item2).click();
                cy.wrap($item2).click();
                cy.contains(keywords_en.query_search);

                cy.wrap($item3).should('have.text',keywords_en.utilities);
                cy.wrap($item3).click();
                cy.wrap($item3).click();
                cy.contains(keywords_en.ASP);
                cy.contains(keywords_en.config_search);
                cy.contains(keywords_en.err_search);
                cy.contains(keywords_en.imp_authorisations);
                cy.contains(keywords_en.exp_authorisations);
            });

            //----------------------FIN DRIVER ASSERTIONS-------------------------
            cy.wrap($findriver).should('have.text',keywords_en.fin_driver);
            cy.wrap($findriver).click();
            cy.wrap($findriver).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2,$item3,$item4,$item5,$item6,$item7)=>{

                cy.wrap($item1).should('have.text',keywords_en.logic_terminals);
                cy.wrap($item2).should('have.text',keywords_en.sys_config);
                cy.wrap($item3).should('have.text',keywords_en.calendar);
                cy.wrap($item4).should('have.text',keywords_en.dig_config);
                cy.wrap($item5).should('have.text',keywords_en.FIN_copy);
                cy.wrap($item6).should('have.text',keywords_en.BIC_copy);
                cy.wrap($item7).should('have.text',keywords_en.SAG_reg);
            });

            //----------------------TOOLS ASSERTIONS------------------------------
            cy.wrap($tools).should('have.text',keywords_en.tools);
            cy.wrap($tools).click();
            cy.wrap($tools).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').then((element)=>{
                cy.wrap(element).should('have.text',keywords_en.mq_dumper);
            });

            //----------------------ADMINISTRATION TOOLS--------------------------
            cy.wrap($admin).should('have.text',keywords_en.admin);
            cy.wrap($admin).click();
            cy.wrap($admin).click();
            cy.get('.gwt-MenuBarPopup .menuPopupContent .gwt-MenuBar-vertical tr td').spread(($item1,$item2,$item3,$item4,$item5,$item6,$item7,$item8,$item9)=>{
                cy.wrap($item1).should('have.text',keywords_en.roles);
                cy.wrap($item2).should('have.text',keywords_en.users);
                cy.wrap($item3).should('have.text',keywords_en.user_audit);
                cy.wrap($item4).should('have.text',keywords_en.participants);
                cy.wrap($item5).should('have.text', keywords_en.org_manag);
                cy.wrap($item6).should('have.text', keywords_en.context_manag);
                cy.wrap($item7).should('have.text', keywords_en.bic);
                //cy.wrap($item8).should('have.text', keywords_en.web_report)
                cy.wrap($item8).should('have.text', keywords_en.security_report);
            })

            cy.wrap($pref).should('have.text',keywords_en.preferences);
            cy.wrap($pref).click();
            cy.wrap($pref).click();
            cy.get('.gwt-MenuBarPopup tr.menuPopupMiddle td.menuPopupMiddleCenter .menuPopupContent').then((Element)=>{
                cy.wrap(Element).should('have.text',keywords_en.preferences);    
            });
        });

        cy.get('#user-image').click();
        cy.get('.gwt-Anchor').click();

        cy.wait(1500);

    })
})