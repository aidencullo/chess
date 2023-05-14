import React from 'react'
import Screen from './App'

describe('<Screen />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Screen />)
  })
})