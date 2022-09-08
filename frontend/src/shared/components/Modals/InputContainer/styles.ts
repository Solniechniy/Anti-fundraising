import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  position: relative;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #B8B8BF;
  margin-bottom: .25rem;
  margin-left: .25rem;
  & > span {
    margin-left: .25rem;
    opacity: 0.4;
  }
`;

const StyledInput = styled.input`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  outline: none;
  border: none;
  color: #FFFFFF;
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
  width: 100%;
  padding: .75rem;
  border: 1px solid rgba(184, 184, 191, 0.4);
  border-radius: 8px;
  transition: border .2s;
  height: 44px;
  :focus-within, 
  :hover {
    padding: .688rem;
    height: 43px;
    border: 2px solid #B7DA44;
  }
`;

const StyledSelect = styled.select`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  position: relative;
  outline: none;
  border: none;
  color: #FFFFFF;
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
  width: 100%;
  padding: .75rem;
  border: 1px solid rgba(184, 184, 191, 0.4);
  border-radius: 8px;
  transition: border .2s;
  height: 44px;
  :hover {
    padding: .688rem;
    height: 43px;
    border: 2px solid #B7DA44;
  }
  appearance: none;
`;

const StyledTextArea = styled.textarea`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  position: relative;
  outline: none;
  border: none;
  color: #FFFFFF;
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
  width: 100%;
  padding: .75rem;
  border: 1px solid rgba(184, 184, 191, 0.4);
  border-radius: 8px;
  transition: border .2s;
  height: 94px;
  resize: none;
  :hover {
    padding: .688rem;
    height: 93px;
    border: 2px solid #B7DA44;
  }
`;

const Arrow = styled.div`
  position: absolute;
  border: solid #B8B8BF;
  border-width: 0 2px 2px 0;
  display: inline-block;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  padding: 4px;
  right: 17px;
  bottom: 18px;
`;

export default {
  Container,
  Title,
  StyledInput,
  StyledSelect,
  StyledTextArea,
  Arrow,
};
