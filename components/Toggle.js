import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%'
  },
  panel: {
    backgroundColor: '#fafafa'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expandIcon: {
    '&$expanded': {
      transform: 'rotate(90deg)'
    }
  },
  expanded: {}
})

function Toggle (props) {
  const { children, classes, label } = props
  return (
    <div className={classes.root}>
      <Accordion elevation={0} className={classes.panel}>
        <AccordionSummary
          classes={{
            expandIcon: classes.expandIcon,
            expanded: classes.expanded
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ justifyContent: 'space-between' }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default withStyles(styles)(Toggle)
