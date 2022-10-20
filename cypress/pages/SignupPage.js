class SignupPage{
    go(){

        cy.visit('/')
        
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    }

    fillForm(deliver){
        //preenchendo os valores dos campos-clicando no botão de busca de cep
        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //validando os campos que foram preenchidos do endereço
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //Para ir o valor da moto direto no método da entrega tem que inserir em: metodo_entrega
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        //Para fazer upload de imagens
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
                
    }

    submit(){

        //clicar no botão
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }
    alertMessageShouldBe(expectedMessage){

        cy.get('.alert-error').should('have.text', expectedMessage)

    }
}
export default new SignupPage;