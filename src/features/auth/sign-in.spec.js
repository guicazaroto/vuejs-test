import { shallow } from '@vue/test-utils'
import SignIn from './sign-in'
import Vue from 'vue'
import EventBus from '@/plugins/event-bus'
import Vuelidate from 'vuelidate'

Vue.use(EventBus)
Vue.use(Vuelidate)

describe('SignIn', () => {
  let wrapper
  
  beforeAll(() => {
    wrapper = shallow(SignIn)
  })

  const setData = wrapper => wrapper.setData({
    username: 'jonas',
    password: 'ilovewhales'
  })
  
  const resetData = wrapper => wrapper.setData({
    username: '',
    password: ''
  })

  test('state of validate model == false when all inputs is filled ', () => {
    setData(wrapper)
    expect(wrapper.vm.$v.$invalid).toBeFalsy()
  })
  
  test('init state of validate model == true ', () => {
    resetData(wrapper)
    expect(wrapper.vm.$v.$invalid).toBeTruthy()
  })
  
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('event do-sign-in is dispatched by submit method', () => {
    setData(wrapper)
    wrapper.vm.submit()
    const data = wrapper.emitted('do-sign-in')[0][0]
    
    expect(data).toEqual({
      username: 'jonas',
      email: '',
      password: 'ilovewhales',
      keepSignedIn: true
    })
  })

  test('props expected are present on initialize', () => {
    const exepected = ['username', 'email', 'password', 'keepSignedIn']
    const recieved = Object.keys(wrapper.vm.$data)
    
    expect(recieved).toEqual(exepected) 
  })

  test('props are reset when run reset method', () => {
    setData(wrapper)
    wrapper.vm.reset('signup')
    
    expect(wrapper.vm.username).toBe('')
    expect(wrapper.vm.password).toBe('')
    expect(wrapper.vm.email).toBe('')
  })

})
