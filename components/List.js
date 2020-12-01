import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import StarIcon from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'

import Toggle from '~/components/Toggle'

const useStyles = makeStyles(theme => ({
  list: {
    width: '50%',
    margin: '10px auto'
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  anchor: {
    textDecoration: 'underline'
  }
}))

export default function MovieList ({ data }) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([1])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <Box>
      {data.map((value, i) => {
        return (
          <Card key={value.title} className={classes.list}>
            <CardContent>
              <Box style={{ display: 'flex' }}>
                <Avatar
                  style={{ maxWidth: 80, maxHeight: 80 }}
                  alt={`Avatar n°${value.title + 1}`}
                  src={`${value.poster_path}`}
                />
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link href={`/movie/${value.id}`}>
                    <Typography
                      variant='h5'
                      color='primary'
                      className={classes.anchor}
                    >
                      {`${value.title} (${value.release_date})`}
                    </Typography>
                  </Link>
                  <Typography
                    component='h6'
                    variant='body2'
                    color='textSecondary'
                  >
                    {`${value.genres && value.genres.join(', ')}`}
                  </Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon />
                    <Typography
                      component='span'
                      variant='body2'
                      color='textSecondary'
                    >
                      {value.vote_average}
                    </Typography>

                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      Votes: {`${value.vote_count}`}
                    </Typography>
                  </Box>
                  <Toggle label='More Details'>
                    <Typography
                      component={Box}
                      variant='body2'
                      color='textSecondary'
                    >
                      {`${value.overview}`}
                    </Typography>
                  </Toggle>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )
      })}
    </Box>
  )
}
