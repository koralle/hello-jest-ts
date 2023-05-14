/**
 * @jest-environment jsdom
 */
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('renders correctly with react-test-renderer', () => {
    const button = renderer.create(<Button />)
    expect(button.toJSON()).toMatchSnapshot()
  })

  test("changes the button text upon clicking the button using React Testing Library", () => {
    const button = render(<Button />)

    fireEvent.click(button.getByText("ON"))
    expect(button.getByText(/OFF/i)).toBeTruthy()

    fireEvent.click(button.getByText("OFF"))
    expect(button.getByText(/ON/i)).toBeTruthy()
  })
})


