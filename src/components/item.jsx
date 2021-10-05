/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { Checkbox } from '@material-ui/core';
// import { FormControlLabel } from '@material-ui/core';
import React from 'react';
import label from 'react';
import input from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

function Item( props ) {

  return (
    <>
        <label>
          <input
            type="checkbox"
            checked={props.checked}
            onChange={props.onChange}
          />
          {props.cityName}
        </label>
      
      
    </>
  );
}

export default Item;