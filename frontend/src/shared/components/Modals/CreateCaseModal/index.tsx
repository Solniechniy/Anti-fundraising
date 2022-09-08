import ModalWrapper from 'shared/components/Modals/ModalWrapper';

import styles from './styles';

export interface ICreateCaseModal {
  closeModal: () => void;
}

export default function CreateCaseModal({
  closeModal,
}: ICreateCaseModal): JSX.Element | null {
  return (
    <ModalWrapper closeModal={closeModal} isCentered>
      <styles.Header>
        <p>New Case</p>
        <styles.Close onClick={closeModal}>
          <styles.CloseIcon />
        </styles.Close>
      </styles.Header>

      <styles.Footer>
        FOOTER
      </styles.Footer>
    </ModalWrapper>
  );
}
