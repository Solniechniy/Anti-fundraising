import styles from './styles';

interface IModalWrapper {
  children: JSX.Element[],
  closeModal: () => void,
  isCentered?: boolean,
  isFullWidth?: boolean,
  height?: string,
}

export default function ModalWrapper({
  children, closeModal, isCentered, isFullWidth, height,
}: IModalWrapper): JSX.Element{
  return (
    <>
      <styles.BackgroundLayout onClick={closeModal} />
      <styles.Modal
        isCentered={isCentered}
        isFullWidth={isFullWidth}
        height={height}
      >
        {children}
      </styles.Modal>
    </>
  );
}
