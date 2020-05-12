import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

/* Elements placed inside <Row> ... </Row> tags will use ...

----- ... "justify" to affect HORIZONTAL SPACE between elements -----
   justify can accept flex-end, flex-start, center, space-between, space-around, space-evenly as its option

   ex: justify="space-between" tries to place one element at the left and one at the right of the container
   ex: justify="flex-start" tries to place elements at the left of the container

----- ... "alignItems" to affect VERTICAL SPACE between elements -----
  alignItems can accept stretch, center, flex-start, flex-end, baseline as its option

  ex: alignItems="flex-start" tries to place elements at the top of the container 

  There is no 'space between' for alignItems, if you want to separate elements vertically use a column with justify="space-between"

Labeling a container "row" does NOT mean elements will automatically be stacked in a neat row
  Use xs={3}, xs={4} etc to make Child elements take less than the full width availabile, which lets them render side by side to each other
*/

const Row: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Grid container direction="row" {...gridProps}>
      {children}
    </Grid>
  )
}

export default Row;