import styled from 'styled-components';

export const PaginationStyled = styled.div`
  display: flex;
  padding-left: 1.5rem;
  align-items: flex-end;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 4rem;
      font-weight: 700;
      padding: 0.5rem 0;
      font-size: 0.75rem;
      text-align: center;
      background-color: transparent;
      color: #B3B3B3;
      transition: 0.5s ease all;
      border: 1px solid #B3B3B3;
      border-radius: 0.75rem;

      &[type="number"] {
        -moz-appearance: textfield;
      }

      &:focus {
        outline: none;
        border: 1px solid #FDEE2D;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    button {
      border: none;
      line-height: 0;
      cursor: pointer;
      background-color: transparent;

      &.disabled {
        svg {
          path {
            fill: '#626267';
          }
        }
      }

      &.prev {
        margin-right: 1rem;
        svg {
          transform: rotate(180deg);
        }
      }

      &.next {
        margin-left: 1rem;
      }
    }

    span {
      font-weight: 400;
      margin-left: 1rem;
      font-size: 0.75rem;
      color: '#E5E5E5';
    }
  }
`;

export default PaginationStyled;
