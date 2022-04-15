import axios from 'axios'
import FeedbackService from './feedbacks'

const API_ENVS = {
    production: 'https://backend-treinamento-vuejsbrasil.vercel.app/',
    development: '',
    local: 'http://localhost:3000'
}

const httpClient = axios.create({
    baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})


httpClient.interceptors.request.use(config => {

})

httpClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const canThrowAnError = error.request.status === 0 ||
        error.request.status === 500

    if (canThrowAnError) {
        throw new Error(error.message)
    }

    return error
})

export default {
    feedbacks: FeedbackService(httpClient)
}