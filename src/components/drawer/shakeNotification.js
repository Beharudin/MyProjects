import styled from 'styled-components';

const StyledDiv = styled.span`
  span {
    display: inline-block;
  }
  .rise-shake {
    animation: jump-shaking 0.83s infinite;
  }

  @keyframes jump-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateY(-9px);
    }
    35% {
      transform: translateY(-9px) rotate(17deg);
    }
    55% {
      transform: translateY(-9px) rotate(-17deg);
    }
    65% {
      transform: translateY(-9px) rotate(17deg);
    }
    75% {
      transform: translateY(-9px) rotate(-17deg);
    }
    100% {
      transform: translateY(0) rotate(0);
    }
  }
`;
export default StyledDiv;
