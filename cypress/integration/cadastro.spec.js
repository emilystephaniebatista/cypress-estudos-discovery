describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var deliver = {
            name: 'Emily Stephanie',
            cpf: '00000000141',
            email: 'emily@hotmail.com',
            whatsapp: '14999999999',
            address:{
                postalcode: '17533540',
                street: 'Rua Gerson RIbeiro',
                number: '1000',
                details: 'Casa',
                district: 'Residencial Professor Luiz Rossi (Padre Nóbrega)',
                city_state: 'Marília/SP'

            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'

        }

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
        
        //clicar no botão
        cy.get('form button[type="submit"]').click()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
    
    })
})

it('CPF incorreto', ()=>{
    cy.viewport(1440, 900)
    cy.visit('https://buger-eats.vercel.app')
    
    cy.get('a[href="/deliver"]').click()
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    var deliver = {
        name: 'Emily Stephanie',
        cpf: 'kedsoidis3333',
        email: 'emily@hotmail.com',
        whatsapp: '14999999999',
        address:{
            postalcode: '17533540',
            street: 'Rua Gerson RIbeiro',
            number: '1000',
            details: 'Casa',
            district: 'Residencial Professor Luiz Rossi (Padre Nóbrega)',
            city_state: 'Marília/SP'

        },
        delivery_method: 'Moto',
        cnh: 'cnh-digital.jpg'

    }
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
     
     //clicar no botão
     cy.get('form button[type="submit"]').click()

     cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')

})