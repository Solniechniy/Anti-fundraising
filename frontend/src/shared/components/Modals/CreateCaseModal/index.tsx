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
  const [form, setForm] = useState<IValues>(initialFormValue);
  const categoryArray = Object.entries(category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

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
          value={form.caseName}
          handleChange={handleChange}
          title="Case Name"
        />
        <Select
          category={categoryArray}
          title="Category"
          handleChange={handleChange}
        />
        <TextArea
          value={form.description}
          handleChange={handleChange}
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
