// import


export function validateEmptyAndLength4(value) {

    if (!value) {
        return '*Este campo é obrigatório'
    }

    if (value.length < 4) {
        return '*Este campo precisa de no mínimo 4 caracteres'
    }

    return true

}

export function validateEmptyAndEmail(value) {

    if (!value) {
        return '*Este campo é obrigatório'
    }

    const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

    if(!isValid) {
        return '*Este campo precisa ser um e-mail'
    }

    return true

}