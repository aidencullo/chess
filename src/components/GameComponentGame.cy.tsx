import React from 'react'
import Game from './GameComponent'

describe('<Game />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
      cy.mount(<Game />)
      // cy.get(':nth-child(10)').should('have.attr', 'background-color')
      cy.get(':nth-child(10)').get('button').then(($p) => {
	  cy.log($p)
      });
  })
})
