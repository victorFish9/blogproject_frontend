import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// test('renders content', () => {
//     const blog = {
//         title: 'Component testing is done with react-testing-library',
//         author: 'Component testing is done with react-testing-library'
//     }

//     render(<Blog blog={blog} />)

//     const element = screen.getByText('Component testing is done with react-testing-library')
//     screen.debug()
//     expect(element).toBeDefined()
// })

test('click the button', async () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Component testing is done with react-testing-library',
        url: 'Component testing is done with react-testing-library',
        likes: 'Component testing is done with react-testing-library',
        user: 'Component testing is done with react-testing-library'
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Show more')
    await user.click(button)
})