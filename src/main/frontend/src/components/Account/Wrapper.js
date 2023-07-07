import styled from "styled-components";

export const ParentWrapper = styled.div`
    width: ${props => props.width}%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    position: relative;
`

export const InnerWrapper = styled.div`
    width: ${props => props.width}%;
    gap: ${props => props.gap}px;
    margin-top: ${props => props.marginTop}px;
    display: flex;
    flex-direction: column;  
    flex: 1;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  margin-top: 350px;
`;

export const FlexRowWrapper = styled.div`
  display: flex;
  gap: ${props => props.gap}px;
`;

export const FlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap}px;
`;