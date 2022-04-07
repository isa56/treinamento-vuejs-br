import { 
    validateEmptyAndEmail,
    validateEmptyAndLength4
} from './validators'

describe('Validators utils', () => {
    it('Should give an error with empty payload', () => {
        expect(validateEmptyAndLength4()).toBe('*Este campo é obrigatório')
    })

    it('Should give an error with less than 4 characters payload', () => {
        expect(validateEmptyAndLength4('12')).toBe('*Este campo precisa de no mínimo 4 caracteres')
    })

    it('Should pass the test returning true', () => {
        expect(validateEmptyAndLength4('1213546')).toBe(true)
    })

    it('Should give an error with empty payload', () => {
        expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório')
    })

    it('Should give an error with invalid email payload', () => {
        expect(validateEmptyAndEmail('dasdsaf')).toBe('*Este campo precisa ser um e-mail')
    })
    
    it('Should pass the test returning true', () => {
        expect(validateEmptyAndEmail('dasdsaf@gfaghjdafks.com')).toBe(true)
    })

})