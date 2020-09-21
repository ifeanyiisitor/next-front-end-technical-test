import '@testing-library/jest-dom/extend-expect'

import Link from 'components/Link'
import Index from 'pages'
import { useStore } from 'store'
import { Provider } from 'react-redux'
import { performSearch } from 'modules/search/service'
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react'

jest.mock('modules/search/service', () => ({
  performSearch: jest.fn(),
}))

jest.mock('components/Link', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const artistOne = {
  id: 1,
  artistId: 1,
  artistName: 'John Jackson',
  artistLinkUrl: 'http://www.google.com',
  primaryGenreName: 'Pop',
  wrapperType: 'artist',
}

const artistTwo = {
  id: 2,
  artistId: 2,
  artistName: 'John Jackson',
  artistLinkUrl: 'http://www.google.com',
  primaryGenreName: 'Pop',
  wrapperType: 'artist',
}

function mockLinkComponent() {
  ;((Link as any) as jest.Mock).mockImplementation(({ children, ...otherProps }: any) => {
    return <a {...otherProps}>{children}</a>
  })
}

function mockSearchServiceResults(results: any) {
  ;(performSearch as jest.Mock).mockReturnValue(Promise.resolve(results))
}

function Wrapper({ children }: any) {
  const store = useStore()
  return <Provider store={store}>{children}</Provider>
}

function elements() {
  const searchForm = () => screen.getByLabelText('Artist Details Search')
  const searchInput = () => within(searchForm()).getByPlaceholderText('Enter your search term...')
  const searchSubmitButton = () => searchForm().querySelector('button[type="submit"]')
  const noResultsMessage = () => screen.queryByText('There are no results')
  const searchResultsList = () => screen.queryByLabelText('Search Results')
  const searchResultItems = () => {
    const resultsList = searchResultsList()
    if (!resultsList) return []
    return within(resultsList).queryAllByRole('listitem')
  }

  return {
    searchForm,
    searchInput,
    searchSubmitButton,
    noResultsMessage,
    searchResultsList,
    searchResultItems,
  }
}

beforeEach(mockLinkComponent)
afterEach(jest.resetAllMocks)

test('General search functionality', async () => {
  const {
    searchForm,
    searchInput,
    noResultsMessage,
    searchResultsList,
    searchResultItems,
    searchSubmitButton,
  } = elements()

  const results = [artistOne, artistTwo]

  mockSearchServiceResults(results)

  render(
    <Wrapper>
      <Index />
    </Wrapper>
  )

  expect(searchForm()).toBeInTheDocument()
  expect(noResultsMessage()).not.toBeInTheDocument()
  expect(searchResultItems()).toHaveLength(0)

  fireEvent.change(searchInput(), { target: { value: 'Jack Johnson' } })
  fireEvent.click(searchSubmitButton())

  await waitFor(() => expect(searchResultsList()).toBeInTheDocument())
  expect(searchResultItems()).toHaveLength(results.length)
  expect(noResultsMessage()).not.toBeInTheDocument()
})

test('Displays `no results` notification when a search yields no results', async () => {
  mockSearchServiceResults([])

  const { searchInput, noResultsMessage, searchResultItems, searchSubmitButton } = elements()

  render(
    <Wrapper>
      <Index />
    </Wrapper>
  )

  fireEvent.change(searchInput(), { target: { value: 'Jack Johnson' } })
  fireEvent.click(searchSubmitButton())

  await waitFor(() => expect(noResultsMessage()).toBeInTheDocument())

  expect(searchResultItems()).toHaveLength(0)
})
