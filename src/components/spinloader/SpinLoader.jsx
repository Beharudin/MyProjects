import StyledDiv from './spinLoaderStyle.js';

const SpinLoader = () => {
  return (
    <StyledDiv style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div className='loader' style={{ width: '80px' }}>
          <div className='lds-spinner'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};
export default SpinLoader;
