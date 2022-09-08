import { useState } from 'react';

import ModalWrapper from 'shared/components/Modals/ModalWrapper';
import { category } from 'shared/constant';

import InputContainer from '../InputContainer';
import Select from '../InputContainer/Select';
import TextArea from '../InputContainer/TextArea';
import styles from './styles';

export interface ICreateCaseModal {
  closeModal: () => void;
}

const initialFormValue = {
  caseName: '',
  category: '',
  description: '',
};

export interface IValues {
  caseName: string,
  category: string,
  description: string,
}

export default function CreateCaseModal({
  closeModal,
}: ICreateCaseModal): JSX.Element | null {
  const [values, setValues] = useState<string>(initialFormValue.caseName);
  const [select, setSelect] = useState<string>(initialFormValue.category);
  const [textArea, setTextArea] = useState<string>(initialFormValue.description);
  const categoryArray = Object.entries(category);
  console.log(values, select, textArea);
  return (
    <ModalWrapper closeModal={closeModal} isCentered>
      <styles.Header>
        <p>New Case</p>
        <styles.Close onClick={closeModal}>
          <styles.CloseIcon />
        </styles.Close>
      </styles.Header>
      <styles.Body>
        <InputContainer
          value={values}
          setValue={setValues}
          title="Case Name"
        />
        <Select
          category={categoryArray}
          title="Category"
          setValues={setSelect}
        />
        <TextArea
          value={textArea}
          setValue={setTextArea}
          title="Description"
          subTitle="(Option)"
        />
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
