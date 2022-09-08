import styled from 'styled-components';

const BackgroundLayout = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(24, 24, 31, 0.8);
  backdrop-filter: blur(24px);
`;

const Modal = styled.div<{ isCentered?: boolean, isFullWidth?: boolean, height?: string, color?: string }>`
  height: ${({ height }) => (height || 'auto')};
  overflow: auto;
  z-index: 200;
  position: fixed;
  display: flex;
  flex-direction: column;
  min-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '20.5rem')};
  background: ${({ color }) => color || '#28282F'};
  color: #E5E5E5;
  box-shadow: 0px 4px 8px -4px ${({ theme }) => theme.boxShadowCard};
  border-radius: 1rem;
  padding: 1.5rem;
  top: ${({ isCentered }) => (isCentered ? '50%' : '100%')};
  left: 50%;
  transform: ${({ isCentered }) => (
    isCentered ? 'translate(-50%, -50%)' : 'translate(-50%, -100%)'
  )};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-height: 100vh;
    border-radius: 1rem 1rem 0 0;
  `}
`;

export default {
  BackgroundLayout,
  Modal,
};
