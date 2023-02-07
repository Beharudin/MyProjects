import React, { useEffect, useState } from 'react';
import './loanform.css';
import axios from 'axios';
import { BASE_BACKEND_URL, cookies } from '../..';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import { FormModal } from '../formModal/FormModal';

const validateFormData = () => {
  return true;
};

const NewLoan = ({
  reloadDrawerOptions,
  reloadBodyOption,
  props,
  resetBackground,
}) => {
  const dispatch = useDispatch();
  const [activeStep] = useState(0);
  const [formData] = useState(new FormData());
  const userId = cookies.get('userId');

  useEffect(() => {}, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (activeStep === 3) {
        const data = {
          loanData: formData,
          userId,
        };

        if (!(await validateFormData(data.formData))) {
          dispatch(uiActions.notif({ type: 'error', msg: 'invalid data' }));
        } else {
          //spin
          dispatch(uiActions.startLoad());

          const result = await axios.post(`${BASE_BACKEND_URL}/initLoan`, data);

          dispatch(uiActions.notif({ type: 'success', msg: result.msg }));
          dispatch(uiActions.stopLoad());
          reloadDrawerOptions();
          reloadBodyOption('dashboard');
        }
      }
    } catch (err) {
      console.log('err catched');
      dispatch(uiActions.stopLoad());

      dispatch(
        uiActions.notif({
          type: 'error',
          msg: err.response?.data ? err.response?.data : err,
        })
      );
      console.log(err);
    }
  };

  return (
    <div className='loanFormPage'>
      <FormModal resetBackground={resetBackground} />
    </div>
  );
};

export default NewLoan;
