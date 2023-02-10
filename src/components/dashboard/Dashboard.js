import { ButtonBase, Card, IconButton, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LabelIcon from '@mui/icons-material/Label';
import { uiActions } from '../../store/ui';
import { useDispatch } from 'react-redux';

export const Dashboard = (props) => {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.stopLoad());
    setOptions(
      props.drawerOptions.map((el) => ({
        ...el,
        hovering: false,
      }))
    );
  }, [props]);

  return (
    <Grid container sx={{ display: 'flex' }}>
      {options.map((el) => {
        return (
          <Grid item xs={12} md={3} margin={3}>
            <Card elevation={el.hovering ? 10 : 4}>
              <ButtonBase
                onMouseEnter={() => {
                  const copy = [...options];
                  copy.splice(options.indexOf(el), 1, {
                    ...el,
                    hovering: true,
                  });
                  setOptions(copy);
                }}
                onMouseLeave={() => {
                  const copy = [...options];
                  copy.splice(options.indexOf(el), 1, {
                    ...el,
                    hovering: false,
                  });
                  setOptions(copy);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}
                onClick={() => props.setBodyOption(el.text)}
              >
                <IconButton>
                  <LabelIcon fontSize='large' />
                </IconButton>
                {el.text}
              </ButtonBase>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
