## Getting Started

```bash
docker build -t movie-app -f ./Dockerfile .
docker run -p 3000:3000 -t movie-app:latest
```

or

```bash
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Contains compact and detailed view

## Routes

```
/ => top 100 movies
/movies => top 100 movies or search results
/movies/{id} => details on movie
```
