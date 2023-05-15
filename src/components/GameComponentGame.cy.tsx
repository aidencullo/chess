import React from 'react'
import Game from './GameComponent'

describe('<Game />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
      cy.mount(<Game />)
      cy.get(':nth-child(10)').click();
      cy.get('.board > :nth-child(2)').should('have.css', 'border-color', 'rgb(0, 128, 0)')
      
  })
})
