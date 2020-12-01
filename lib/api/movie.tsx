import request from '../request'

const cache = new Map()

export async function popular(query) {
  console.log('popular::query', query)
  const body = await request.get('movie/popular', {query})
  return body
}

export async function find(query) {
  console.log('find::query', query)
  let append = ['credits', 'translations', 'keywords']
  const body = await request.get('search/movie', {
    append_to_response: append,
    query,
  })
  return body
}

export async function details(id) {
  console.log('details::id', id)
  let append = ['credits', 'translations', 'keywords']
  const body = await request.get(`movie/${id}`, {append_to_response: append})
  return body
}

export async function similar(id) {
  console.log('similar::id', id)
  const body = await request.get(`movie/${id}/similar`)
  return body
}

export async function watch(id) {
  console.log('watch::query', id)
  const body = await request.get(`movie/${id}/watch/providers`)
  return body
}

export async function genres(...ids) {
  console.log('genres::query', ids)
  if (cache.size == 0) {
    const {genres} = await request.get(`genre/movie/list`)
    genres.forEach((g) => cache.set(g.id, g.name))
  }
  const out = ids.map((i) => cache.get(i))
  return out
}

export async function actors(id) {
  console.log('watch::actors', id)
  const body = await request.get(`movie/${id}/credits`)
  return body
}
