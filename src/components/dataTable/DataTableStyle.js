import styled from "styled-components";
import Modal from "styled-react-modal";
export const StyledDiv = styled.div`
  .clearButton {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchInput {
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 
  #F2FAFFE6;
  border-radius: 25px;
  border: 2px solid 
  #00ADEF;
  padding: 20px;
  width: fit-content;
  block-size: fit-content;
 
  
  input {
    border-radius: 15px;
    border: 2px solid #00adef;
    padding: 10px;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr;
  }
  `;
