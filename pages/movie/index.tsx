import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {500: '#467fcf'},
  },
})

import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import List from '~/components/List'
import Table from '~/components/MovieTable'
import SearchBar from '~/components/Searchbar'

import * as movieService from '~/services/movie'

function Index({params, total_pages, movie_list = [], ...props}) {
  const [movies, setMovies] = useState(movie_list)
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isCompactView, setIsCompactView] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const {page, total_results, total_pages, results} = await movieService.find({
      query: searchValue,
    })
    setPageNumber(page)
    setTotalPages(total_pages)
    setMovies(results)
    setSearchQuery(searchValue)
  }
  async function handleNext() {
    const {total_pages, results} = await movieService.popular({
      page: pageNumber,
    })
    setPageNumber(pageNumber + 1)
    setTotalPages(total_pages)
    setMovies(results)
  }
  async function handleBack() {
    setPageNumber(Math.abs(pageNumber - 1) || 1)
    const {total_pages, results} = await movieService.popular({
      page: pageNumber,
    })
    setTotalPages(total_pages)
    setMovies(results)
  }
  async function handleTop100() {
    setPageNumber(Math.abs(pageNumber - 1) || 1)
    const {total_pages, results} = await movieService.popular({
      page: pageNumber,
    })
    setTotalPages(total_pages)
    setMovies(results)
  }
  return (
    <ThemeProvider theme={theme}>
      <SearchBar onChange={setSearchValue} searchValue={searchValue} handleSubmit={handleSubmit} />
      <Box>
        <Box>
          <Box>
            <h2>
              {!!searchQuery
                ? `Search results for: ${searchQuery} -- Page ${pageNumber} of ${total_pages}`
                : `Now Showing Top 100 Page ${pageNumber} of ${total_pages}`}
            </h2>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: theme.spacing(2),
              }}
            >
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Back
              </Button>
              <Button variant="outlined" color="primary" onClick={handleTop100}>
                Top 100
              </Button>
              <Button variant="outlined" color="primary" onClick={() => setIsCompactView(!isCompactView)}>
                {isCompactView ? 'Compact View' : 'Detailed View'}
              </Button>
              <Button variant="outlined" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
            {isCompactView ? <List data={movies} /> : <Table data={movies} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export async function getServerSideProps({query, ...rest}) {
  const {total_pages, results} = await movieService.popular({...query})

  return {
    props: {
      total_pages: total_pages,
      movie_list: results,
    },
  }
}
export default Index
