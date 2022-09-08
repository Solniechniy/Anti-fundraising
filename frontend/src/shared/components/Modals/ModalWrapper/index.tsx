import styles from './styles';

interface IModalWrapper {
  children: JSX.Element[],
  closeModal: () => void,
  isCentered?: boolean,
  isFullWidth?: boolean,
  height?: string,
  color?: string,
}

export default function ModalWrapper({
  children, closeModal, isCentered, isFullWidth, height, color,
}: IModalWrapper): JSX.Element{
  return (
    <>
      <styles.BackgroundLayout onClick={closeModal} />
      <styles.Modal
        isCentered={isCentered}
        isFullWidth={isFullWidth}
        height={height}
        color={color}
      >
        {children}
      </styles.Modal>
    </>
  );
}
