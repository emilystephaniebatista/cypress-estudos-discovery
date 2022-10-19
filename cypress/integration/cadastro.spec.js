describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var entregador = {
            nome: 'Emily Stephanie',
            cpf: '00000000141',
            email: 'emily@hotmail.com',
            whatsapp: '14999999999',
            endereco:{
                cep: '17533540',
                rua: 'Rua Gerson RIbeiro',
                numero: '1000',
                complemento: 'Casa',
                bairro: 'Residencial Professor Luiz Rossi (Padre Nóbrega)',
                cidade_uf: 'Marília/SP'

            },
            metodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'

        }
        //preenchendo os valores dos campos-clicando no botão de busca de cep
        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        //validando os campos que foram preenchidos do endereço
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        //Para ir o valor da moto direto no método da entrega tem que inserir em: metodo_entrega
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        
        //Para fazer upload de imagens
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)
        
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

    var entregador = {
        nome: 'Emily Stephanie',
        cpf: '00000000141AA****',
        email: 'emily@hotmail.com',
        whatsapp: '14999999999',
        endereco:{
            cep: '17533540',
            rua: 'Rua Gerson RIbeiro',
            numero: '1000',
            complemento: 'Casa',
            bairro: 'Residencial Professor Luiz Rossi (Padre Nóbrega)',
            cidade_uf: 'Marília/SP'

        },
        metodo_entrega: 'Moto',
        cnh: 'cnh-digital.jpg'

    }
    //preenchendo os valores dos campos-clicando no botão de busca de cep
    cy.get('input[name="name"]').type(entregador.nome)
    cy.get('input[name="cpf"]').type(entregador.cpf)
    cy.get('input[name="email"]').type(entregador.email)
    cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

    cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
    cy.get('input[type=button][value="Buscar CEP"]').click()
    cy.get('input[name="address-number"]').type(entregador.endereco.numero)
    cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

    //validando os campos que foram preenchidos do endereço
    cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
    cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
    cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

    //Para ir o valor da moto direto no método da entrega tem que inserir em: metodo_entrega
    cy.contains('.delivery-method li', entregador.metodo_entrega).click()
    
    //Para fazer upload de imagens
    cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)
    
    //clicar no botão
    cy.get('form button[type="submit"]').click()

    cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')

})