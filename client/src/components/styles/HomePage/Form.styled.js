import styled from "styled-components";
import padlockSVG from "../../HomePage/assets/images/lock_black_24dp.svg";
import personSVG from "../../HomePage/assets/images/person_black_24dp.svg";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100vh;
`;

export const DivFormsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  height: 625px;
  background-color: white;
  border-radius: 0.5rem;
`;

export const DivForms = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Poppins;
  width: 100%;
  h1 {
    margin-top: 0.8rem;
    margin-bottom: -0.5rem;
    font-size: 2.3rem;
    text-align: center;
  }

  form {
    max-width: 450px;
    width: 90%;
  }

  form > label {
    font-size: 1rem;
    display: block;
    margin-top: 0.8rem;
  }

  form > button {
    display: block;
    width: 100%;
    height: 2.5rem;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    background: #a64bf4;
    border-radius: 1.5rem;
    margin: 1rem auto;
    background-image: linear-gradient(to right, #00dbde, #fc00ff);
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
  }

  form > div > input {
    margin-left: 1.5rem;
    width: 95%;
    outline: none;
    border: none;
    line-height: 2.5;
  }

  .inputUsernameContainer {
    width: 100%;
    background-image: url(${personSVG});
    background-repeat: no-repeat;
    background-position: left center;
  }

  .usernameInpEmpty::placeholder {
    color: red;
  }

  .inputPasswordContainer {
    background-image: url(${padlockSVG});
  }

  .inputUsernameContainer,
  .inputPasswordContainer {
    background-repeat: no-repeat;
    background-position: center left;
    border-bottom: 2px solid #d9d9d9;
  }

  .err {
    color: red;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
`;
