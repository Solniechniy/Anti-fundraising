import { useState } from 'react';

import ModalWrapper from 'shared/components/Modals/ModalWrapper';

import styles from './styles';

export interface ICreateCaseModal {
  closeModal: () => void;
}

const initialFormValue = {
  caseName: '',
  category: '',
  description: '',
};

export default function CreateCaseModal({
  closeModal,
}: ICreateCaseModal): JSX.Element | null {
  const [values, setValues] = useState<any>(initialFormValue);
  return (
    <ModalWrapper closeModal={closeModal} isCentered>
      <styles.Header>
        <p>New Case</p>
        <styles.Close onClick={closeModal}>
          <styles.CloseIcon />
        </styles.Close>
      </styles.Header>
      <styles.Body>
        asv
      </styles.Body>
      <styles.Footer>
        <styles.CancelBtn>
          Cancel
        </styles.CancelBtn>
        <styles.SaveCaseBtn>
          Save Case
        </styles.SaveCaseBtn>
      </styles.Footer>
    </ModalWrapper>
  );
}
