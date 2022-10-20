import SignupPage from '../pages/SignupPage'

describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{

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

        var signup = new SignupPage()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)        

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
    var signup = new SignupPage()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
})