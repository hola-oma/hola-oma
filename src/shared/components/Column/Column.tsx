import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

/* Elements placed inside <Column> ... </Column> tags will use ...

|||| ... "justify" to affect VERTICAL SPACE between elements ||||||
   justify can accept flex-end, flex-start, center, space-between, space-around, space-evenly as its option

   ex: justify="space-between" tries to place one element at the top and one at the bottom of the container
   ex: justify="flex-start" tries to place elements at the top of the container

|||| ... "alignItems" to affect HORIZONTAL SPACE between elements ||||||
  alignItems can accept stretch, center, flex-start, flex-end, baseline as its option

  ex: alignItems="flex-start" tries to place elements at the left side of the container 

  There is no 'space between' for alignItems, if you want to separate elements horizontally use a row with justify="space-between"

Labeling a container "column" does NOT mean elements will automatically be stacked in a neat column
  Use xs={12} to make Child elements take the full width availabile, which forces adjacent elements to render "below" on their own "line"
*/

const Column: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Grid container direction="column" {...gridProps}>
      {children}
    </Grid>
  )
}

export default Column;
