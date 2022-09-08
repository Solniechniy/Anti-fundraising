import styled from 'styled-components';

import {
  Status, StatusMap,
} from 'providers/interfaces';

import { ReactComponent as Circle } from '../../../assets/images/circle.svg';

export const StatusWrapper = styled.div<{ statusEnum: Status }>`
  background-color: ${({ statusEnum }) => {
    switch (statusEnum){
      case Status.Accepted: return 'rgba(143, 217, 88, 0.2)';
      case Status.Loaded: return 'rgba(237, 187, 82, 0.2)';
      case Status.Pending: return 'rgba(184, 184, 191, 0.1)';
      case Status.Rejected: return 'rgba(255, 95, 96, 0.2)';
      default: return 'rgba(184, 184, 191, 0.1)';
    }
  }};
  color: ${({ statusEnum }) => {
    switch (statusEnum){
      case Status.Accepted: return 'rgba(143, 217, 88)';
      case Status.Loaded: return 'rgba(237, 187, 82)';
      case Status.Pending: return '#B8B8BF';
      case Status.Rejected: return 'rgba(255, 95, 96)';
      default: return '#B8B8BF';
    }
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 1.5px 4px;
  margin-left: 8px;
`;

export const CircleElement = styled(Circle)<{ statusEnum: Status }>`
  width: 12px;
  height: 12px;
  display: flex;
  margin-right: 4px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  >circle {
    stroke: ${({ statusEnum }) => {
    switch (statusEnum){
      case Status.Accepted: return 'rgba(143, 217, 88)';
      case Status.Loaded: return 'rgba(237, 187, 82)';
      case Status.Pending: return '#B8B8BF';
      case Status.Rejected: return 'rgba(255, 95, 96)';
      default: return '#B8B8BF';
    }
  }};
  }
`;

export function StatusComponent({ status }:{ status: Status }){
  return (
    <StatusWrapper statusEnum={status}>
      <CircleElement statusEnum={status} />
      {StatusMap[status]}
    </StatusWrapper>
  );
}
