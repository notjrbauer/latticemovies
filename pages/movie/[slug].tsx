import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Box} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import StarIcon from '@material-ui/icons/Star'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
})

export async function getServerSideProps({params}) {
  const movieDetails = await movieService.details(params.slug)
  return {
    props: movieDetails,
  }
}

function Details({similarMovies = [], ...props}) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea display="flex" flexDirection="column">
        <CardMedia className={classes.media} image={props.backdrop_path} flexDirection="column">
          <CardContent display="flex" flexDirection="column">
            <Box display="flex" justifyContent="center" flexDirection="column">
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}

                <StarIcon style={{color: 'yellow'}} />
                {props.vote_average}
              </Typography>
              <img style={{maxWidth: '100px', maxHeight: '100px'}} src={props.poster_path} />
              <div style={{backgroundColor: 'white', color: 'black'}}>
                <Typography variant="body2" component="p">
                  {props.overview}
                </Typography>
              </div>
            </Box>
          </CardContent>
          <CardContent display="flex" flexDirection="column">
            <Typography>Related Movies</Typography>
            {similarMovies.results.map((e) => {
              return (
                <Box className={classes.link} display="flex" flexDirection="column">
                  <Link href={`/movie/${e.id}`}>{`${e.title} (${e.release_date})`}</Link>
                </Box>
              )
            })}
          </CardContent>
        </CardMedia>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default Details
