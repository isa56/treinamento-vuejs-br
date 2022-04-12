import { reactive, readonly } from 'vue'

export type StoreState = {
    apiKey: string,
    currentComponent: string,
    currentPage: string,
    feedbackType: string,
    fingerprint: string,
    message: string
}

const initialState: StoreState = {
    apiKey: '',
    currentComponent: 'SelectFeedbackType',
    currentPage: '',
    feedbackType: '',
    fingerprint: '',
    message: ''
}

const state = reactive<StoreState>({ ...initialState })

export function setApiKey(apiKey: string): void {
    state.apiKey = apiKey
}

export function setCurrentComponent(component: string): void {
    state.currentComponent = component
}

export function setCurrentPage(page: string): void {
    state.currentPage = page
}


export function setFeedbackType(feedbackType: string): void {
    state.feedbackType = feedbackType
}

export function setFingerprint(fingerprint: string): void {
    state.fingerprint = fingerprint
}

export function setMessage(message: string): void {
    state.message = message
}

export function resetStore(): void {

    setApiKey(initialState.apiKey)
    setCurrentComponent(initialState.currentComponent)
    setCurrentPage(initialState.currentPage)
    setFeedbackType(initialState.feedbackType)
    setFingerprint(initialState.fingerprint)
    setMessage(initialState.message)

}

export default readonly(state)