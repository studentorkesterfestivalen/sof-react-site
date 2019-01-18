import React, { Component, forwardRef } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

class Test extends Component{
  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie eu nunc a euismod. Suspendisse vel dolor sem. Aenean semper felis bibendum tincidunt eleifend. Donec imperdiet ut nisl nec pretium. Phasellus dapibus, arcu vel ultricies pellentesque, metus elit interdum nulla, a sagittis mauris massa tristique felis. Phasellus faucibus venenatis eleifend. Curabitur dui lacus, tristique lobortis ligula et, scelerisque tempor felis. Aliquam nec ante quis urna suscipit blandit nec at libero.
              </p>
              <p>
                Nullam commodo iaculis viverra. Ut et neque libero. Proin dapibus arcu quis dolor ultrices pharetra. Nullam bibendum quis elit vel blandit. Sed in lacus risus. Nunc tempor quam vel consequat consequat. Duis eu orci quis velit aliquam rutrum nec a leo. Proin magna mi, ullamcorper accumsan dolor at, ultrices commodo enim. Nunc ante ex, condimentum in lacus sit amet, condimentum dapibus nibh. Quisque commodo lectus sit amet odio eleifend sagittis.
              </p>
              <p>
                Nunc vitae pharetra nisl. Aenean pellentesque imperdiet magna, nec molestie nisl fermentum in. Vestibulum eget rutrum nunc, vitae fringilla justo. Nam faucibus quam vel facilisis tincidunt. Sed porttitor laoreet tortor, a aliquet risus accumsan in. Nulla imperdiet, lacus at gravida condimentum, elit risus lobortis ante, nec tempus quam lorem et mi. Suspendisse ac auctor lacus. Maecenas lacus metus, rhoncus vitae sapien sit amet, varius commodo magna. Praesent pharetra tortor vulputate, vulputate mi a, scelerisque neque. Ut sit amet elit pulvinar, scelerisque orci ac, sodales mauris.
              </p>
              <p>
                Quisque lacinia dictum mi, sed ultrices ante aliquam sed. Pellentesque laoreet arcu nibh, vitae blandit ipsum lobortis et. Etiam venenatis pharetra odio, et suscipit libero eleifend id. Maecenas tincidunt libero lacus, nec malesuada libero consequat sed. Duis massa lorem, ornare eget congue sed, ultrices ac dolor. Vivamus nulla nisi, commodo quis sagittis vitae, sollicitudin id dolor. Proin laoreet leo orci, sit amet consectetur quam auctor vulputate. Sed consectetur dui felis, vitae tristique neque commodo nec. Ut et risus sed dui vulputate rutrum ut eu quam.
              </p>
              <p>
                Proin facilisis nulla eget elit accumsan consequat. Maecenas interdum diam nisl, vel sodales lectus dignissim commodo. Nulla dictum magna arcu, eget semper magna sollicitudin eget. Praesent vitae enim a ante commodo sodales. Nam dui odio, venenatis at turpis nec, condimentum venenatis mauris. Duis consectetur orci dui, et posuere leo vestibulum a. Quisque eget porttitor diam. Vivamus vel dapibus odio, at volutpat metus. Maecenas ultrices, dolor nec vulputate consequat, nisl mi gravida tellus, quis laoreet dui mi a nibh. Phasellus eget velit vitae lacus vehicula iaculis quis nec magna. Duis pulvinar arcu interdum dignissim vehicula.
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Test;
