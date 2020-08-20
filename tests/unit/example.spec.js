import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Header from '@/components/Header.vue'
import routes from '@/router/index.js'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App', () => {
  it('Header should be present at the About page', async () => {
    const router = new VueRouter(routes)
    const wrapper = mount(App, {
      localVue,
      router
    })

    router.push('/about')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })
  it('Header should be present at the root page', async () => {
    const router = new VueRouter(routes)
    const wrapper = mount(App, {
      localVue,
      router
    })

    router.push('/')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(Header).exists()).toBe(true)
  })
})
