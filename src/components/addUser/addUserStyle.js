import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  font-family: Roboto, Arial, sans-serif;
  font-size: 15px;
  form {
    border: 5px solid #f1f1f1;
  }
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 16px 8px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .icon {
    font-size: 110px;
    display: flex;
    justify-content: center;
    color: #4286f4;
  }
  h1 {
    text-align: center;
    font-size: 18;
  }
  button:hover {
    opacity: 0.8;
  }
  .formcontainer {
    text-align: center;
    margin: 24px 50px 12px;
  }
  .container {
    padding: 16px 0;
    text-align: left;
  }
  span.psw {
    float: right;
    padding-top: 0;
    padding-right: 15px;
  }
  /* Change styles for span on extra small screens */
  @media screen and (max-width: 300px) {
    span.psw {
      display: block;
      float: none;
    }
  }
`;

export default StyledDiv;
