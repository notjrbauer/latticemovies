import Link from 'next/link'
import {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import StarIcon from '@material-ui/icons/Star'

import * as movieService from '~/services/movie'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  media: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  header: {
    backgroundSize: 'cover',
    paddingTop: '10rem',
  },
  headerContent: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    paddingTop: '5em',
    paddingBottom: '2em',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 90%)',
  },
  mainContent: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: '2fr 5fr',
    padding: '1rem',
    flexDirection: 'column-reverse',
    maxWidth: '80rem',
    margin: '1rem auto',
  },
  sideBar: {
    position: 'relative',
    boxSizing: 'borderdiv',
    overflow: 'hidden',
    flex: 1,
    flexGrow: 1,
  },
  title: {fontSize: '10vw', lineHeight: '1em', margin: '1rem 0px 0px', padding: '0px'},
})

export async function getServerSideProps({params}) {
  const movieDetails = await movieService.details(params.slug)
  return {
    props: movieDetails,
  }
}

function Details({similarMovies = [], ...props}) {
  const classes = useStyles()
  const crop = {left: 0, top: 0},
    hotspot = {x: 0.5, y: 0.5}
  return (
    <div className="main">
      <div className="movie">
        <div
          className="header"
          style={{
            backgroundImage: `url(${props.backdrop_path})`,
            backgroundPosition: `${(hotspot.x - crop.left) * 100}% ${(hotspot.y - crop.top) * 100}%`,
          }}
        >
          <div className="header-content">
            <h1 className="movie-title">
              {props.title} ({props.vote_average}
              <StarIcon style={{color: 'yellow', fontSize: '10vw', verticalAlign: 'middle'}} />)
            </h1>
          </div>
        </div>
        <div className="content">
          <div className="sidebar">
            <img className="poster" src={props.poster_path} />
          </div>
          <div className="mainContent">
            <div className="overview">{props.overview}</div>
            <h2 className="cast-title">Cast</h2>
            <ul className="cast-list">
              {props.cast.map((c) => {
                return (
                  <li className="cast-list-item">
                    <a className="cast-list-link">
                      <span>
                        <img className="cast-image" src={c.profile_path} />
                      </span>
                      <span>
                        <span class="cast-person-name">{c.name}</span>
                        <span class="cast-character-name">{c.character}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .header {
            background-size: cover;
            padding-top: 10rem;
          }
          .header-content {
            color: rgb(255, 255, 255);
            text-align: center;
            padding-top: 5em;
            padding-bottom: 2em;
            background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 90%);
          }
          .movie-title {
            font-size: 10vw;
            line-height: 1em;
            margin: 1rem 0px 0px;
            padding: 0px;
          }
          .content {
            display: grid;
            gap: 2rem;
            grid-template-columns: 2fr 5fr;
            padding: 1rem;
          }
          .sidebar {
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            -webkit-box-flex: 1;
            flex-grow: 1;
          }
          .poster {
            display: block;
            width: 100%;
          }
          .mainContent {
            flex: 3;
            flex-grow: 3;
          }
          .overview {
            font-size: 1.5em;
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            font-smoothing: antialiased;
            color: #2c3e50;
          }
          .list-item {
            display: block;
            margin: 0px;
            padding: 0px;
          }
          .cast-title {
            display: block;
            font-size: 1.5em;
            margin-block-start: 0.83em;
            margin-block-end: 0.83em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
          }
          .cast-list {
            display: grid;
            line-height: 1em;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          .cast-list-link {
            border: none;
            align-items: flex-start;
            color: inherit;
            text-decoration: none;
            box-align: center;
            align-items: center;
            display: flex;
          }
          .cast-list-link span {
            display: block;
          }
          .cast-list-item {
            display: block;
            margin: 0px;
            padding: 0px;
          }
          .cast-person-name {
            font-size: 1.2em;
            font-weight: 500;
            line-height: 1.2em;
          }
          .cast-character-name {
            display: block;
            font-size: 1.2em;
            font-weight: 500;
            line-height: 1.2em;
          }
          .cast-image {
            margin: 0px 0.5em 0px 0px;
            width: 2rem;
            height: auto;
          }
          .star-icon {
            display: block;
            color: 'yellow';
          }
        `}</style>
      </div>
    </div>
  )
}

export default Details
