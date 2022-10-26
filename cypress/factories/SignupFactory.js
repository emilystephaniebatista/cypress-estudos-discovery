import { faker } from '@faker-js/faker';

var cpf = require('gerador-validador-cpf')

export default{

    deliver: function(){

        var firstname = faker.name.firstName()
        var lastname = faker.name.lastName()

        var data = {
            name: `${firstname} ${lastname}`,
            cpf: cpf.generate(),
            //Para criar e-mail dinâmico
            email: faker.internet.email(firstname),
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

        return data
    }
}