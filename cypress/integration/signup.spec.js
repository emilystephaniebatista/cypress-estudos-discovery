import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'

describe('Signup', ()=>{

    //    before(function(){
    //       cy.log('Tudo aqui é executado uma unica vez ANTES de TODOS os casos de testes')
    //   })

    //    before(function(){
    //       cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    //   })

    //   after(function(){
    //       cy.log('Tudo aqui é executado uma unica vez DEPOIS de TODOS os casos de testes')
    //   })

    //    after(function(){
    //       cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    //   })
    //beforeEach(function() {
    //    cy.fixture('deliver').then((d)=>{
    //        this.deliver = d
    //    })
    //})

    it('User should be deliver', function(){

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)        

    })
    it('Incorrect document', function() {
            var deliver = signupFactory.deliver()
            deliver.cpf = 'eeee***'

            signup.go()
            signup.fillForm(deliver)
            signup.submit()
            signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function() {
            var deliver = signupFactory.deliver()
            deliver.email = 'user.com.br'
                      
            signup.go()
            signup.fillForm(deliver)
            signup.submit()
            signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })
    //para continuar testando sem pausar o teste mesmo se der erro na loja

    context('Required fields', function(){
        const messages = [
            {field:'name', output: 'É necessário informar o nome'},
            {field:'cpf', output: 'É necessário informar o CPF'},
            {field:'email', output: 'É necessário informar o email'},
            {field:'postalcode', output: 'É necessário informar o CEP'},
            {field:'number', output: 'É necessário informar o número do endereço'},
            {field:'delivery_method', output: 'Selecione o método de entrega'},
            {field:'cnh', output: 'Adicione uma foto da sua CNH'}
        ]
        before(function(){
            signupPage.go()
            signupPage.submit()
        })
        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
    //it('Required fields', function(){
    //    signupPage.go()
    //    signupPage.submit()
    //    signupPage.alertMessageShouldBe('É necessário informar o nome')
    //    signupPage.alertMessageShouldBe('É necessário informar o CPF')
    //    signupPage.alertMessageShouldBe('É necessário informar o email')
    //    signupPage.alertMessageShouldBe('É necessário informar o CEP')
    //    signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //    signupPage.alertMessageShouldBe('Selecione o método de entrega')
    //    signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    //})
})

