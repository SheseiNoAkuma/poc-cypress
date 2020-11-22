context('Actions', () => {
    beforeEach(() => {
        cy.visit('/#RoleListPlace:')
        //aliases
        cy.get('[data-cy=role-list-item]').eq(0).as('administrator')
        cy.get('[data-cy=role-list-item]').eq(1).as('approval')
    })

    it('Enable admin 4 eyes without any sso', () => {
        selectAllSkills('@administrator');
        selectAllSkills('@approval');
    })
})

function selectAllSkills(role) {
    cy.get(role).click()

    cy.get("body").then($body => {
        const skillsNotYetSelected = "[data-cy=action-skill-root] input:not(:checked)";
        if ($body.find(skillsNotYetSelected).length > 0) {
            cy.get(skillsNotYetSelected).click({multiple: true, force: true})
            cy.get('[title="Update"]').click()
            //FIXME add data-cy to popup buttons
            cy.get('.gwt-PushButton .html-face').contains('Ok').click();

            //wait save popup to disappear
            cy.waitForNetworkGatewaySave();
        } else
            //FIXME find better way to log element
            cy.log("No action skill to select for element ", role)
    });
}

