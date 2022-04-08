import HeaderLogged from '.'

import { shallowMount } from '@vue/test-utils'
import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

const mockStore = { currentUser: {} }

jest.mock(('@/hooks/useStore'), () => {
    return () => {
        return mockStore
    }
})


describe('<HeaderLogged />', () => {

    it('should render header logged correctly', async () => {

        router.push('/')
        await router.isReady()

        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [router]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render 3 dots when there\'s no user is logged', async () => {

        router.push('/')
        await router.isReady()

        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [router]
            }
        })

        const buttonLogout = wrapper.find('#logout-button')

        expect(buttonLogout.text()).toBe('...')

    })

    it('should render user name when there\'s a logged user', async () => {

        router.push('/')
        await router.isReady()

        mockStore.currentUser.name = 'Isa'
        const wrapper = shallowMount(HeaderLogged, {
            global: {
                plugins: [router]
            }
        })

        const buttonLogout = wrapper.find('#logout-button')

        expect(buttonLogout.text()).toBe('Isa, sair')


    })

})