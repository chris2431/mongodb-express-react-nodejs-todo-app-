import styled from "styled-components";

export const Header = styled.header`
  font-family: Karla;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  h1 {
    font-size: 1.9rem;
    color: white;
  }

  button {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    border-color: black;

    cursor: pointer;
  }

  button:hover {
    transform: scale(0.9);
  }
`;

export const Main = styled.main`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Karla;

  .section::-webkit-scrollbar {
    width: 0.5rem;
  }

  .section::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .section::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);

    border-radius: 0.5rem;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;

    input {
      width: 65%;
      max-width: 19rem;
      border: none;
      border-radius: 0.3rem;
      height: 1.8rem;
      font-size: 1rem;
      padding-left: 0.5rem;
    }

    button {
      border: none;
      padding: 0.5rem 0.7rem;
      border-radius: 0.5rem;
      background-color: blue;
      margin-left: 0.5rem;
      color: white;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  overflow-y: auto;

  /*overflow-x: hidden; */
  justify-content: center;
  width: 95%;
  height: 400px;
  max-width: 650px;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 0px;
`;

export const Thead = styled.thead`
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 3rem;
  color: white;

  tr {
    .thActions {
      width: 2rem;
    }

    .thStatus {
      width: 6rem;
    }
  }
`;

export const Tbody = styled.tbody`
  img {
    width: 1.9rem;
  }
`;

export const Trow = styled.tr`
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  height: 3.5rem;
  .tdActions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    width: 5rem;
    height: 3.5rem;

    @media screen and (min-width: 500px) {
      width: 10rem;
      justify-content: space-evenly;
    }

    .finishedBtn {
      cursor: pointer;
      margin-left: -1rem;
    }

    .deleteBtn {
      cursor: pointer;
    }

    .deleteBtn:hover,
    .finishedBtn:hover {
      transform: scale(0.9);
    }
  }

  .tdStatus,
  .tdName,
  .tdNumber {
    text-align: center;
  }

  .tdName {
    white-space: pre-wrap;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    font-style: italic;
  }
`;
