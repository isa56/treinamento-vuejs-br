import useStore from '@/hooks/useStore'
import { cleanCurrentUser, resetUserStore, setApiKey, setCurrentUser } from './user'

describe('UserStore', () => {

    afterEach(() => {
        resetUserStore()
    })


    it('should set current user', () => {
        const store = useStore()

        setCurrentUser({ name: 'Isa' })

        expect(store.User.currentUser.name).toBe('Isa')
    })


    it('should set api key on current user', () => {
        const store = useStore()

        setApiKey('123')

        expect(store.User.currentUser.apiKey).toBe('123')
    })


    it('should clean current user', () => {
        const store = useStore()

        setCurrentUser({ name: 'Isa' })

        expect(store.User.currentUser.name).toBe('Isa')

        cleanCurrentUser()

        expect(store.User.currentUser.name).toBeFalsy()

    })


})