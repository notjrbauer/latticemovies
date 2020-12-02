import * as movieApi from '../lib/api/movie'

export async function popular(query) {
  const {results, ...rest} = await movieApi.popular(query)
  const movies = await hydrate(results)
  return {results: movies, ...rest}
}

export async function find(query) {
  const {results, ...rest} = await movieApi.find(query)
  const movies = await hydrate(results)
  return {results: movies, ...rest}
}

export async function details(id) {
  const movieDetailsReq = movieApi.details(id)
  const similarMoviesReq = movieApi.similar(id)

  const [movieDetails, similarMovies] = [await movieDetailsReq, await similarMoviesReq]
  const details = await hydrate([movieDetails])
  return {...(details[0] || []), similarMovies}
}

async function hydrate(movies = []) {
  const promises = movies.map(async (movie) => {
    const genres = await movieApi.genres(...(movie.genre_ids || []))
    const poster_path = fmtImage(movie.poster_path)
    const backdrop_path = fmtImage(movie.backdrop_path)
    const release_date = fmtDate(movie.release_date)
    const cast = fmtCast(movie.credits)

    return {...movie, cast, poster_path, backdrop_path, release_date, genres}
  })
  const out = await Promise.all(promises)
  return out
}

function fmtImage(slug) {
  return `//image.tmdb.org/t/p/original${slug}`
}

function fmtDate(d = '') {
  const match = d.match(/\d+/)
  return match && match.length ? match[0] : d
}

function fmtCast(credits) {
  const cast = credits?.cast || []
  return cast.map(parseCast)
}

function parseCast(c) {
  const {character, name, profile_path} = c
  return {
    character,
    name,
    profile_path: fmtImage(profile_path),
  }
}
