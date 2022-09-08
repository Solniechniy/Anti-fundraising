import { useState } from 'react';

import { useCaseService } from 'providers/CaseContractServiceProvider';
import { Category } from 'providers/interfaces';
import { useWalletData } from 'providers/NearWalletProvider';
import ModalWrapper from 'shared/components/Modals/ModalWrapper';

import InputContainer from '../InputContainer';
import Select from '../InputContainer/Select';
import TextArea from '../InputContainer/TextArea';
import styles from './styles';

export interface ICreateCaseModal {
  closeModal: () => void;
}

const initialFormValue = {
  caseName: '',
  category: Category.None,
  description: '',
};

export interface IValues {
  caseName: string,
  category: Category,
  description: string,
}

export default function CreateCaseModal({
  closeModal,
}: ICreateCaseModal): JSX.Element | null {
  const { isSignedIn } = useWalletData();
  const { createCase } = useCaseService();
  const [form, setForm] = useState<IValues>(initialFormValue);
  const categoryArray = Object.keys(Category);
  const canSubmit = isSignedIn && form.caseName && form.category !== Category.None;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const handleClick = async () => {
    await createCase(
      form.caseName,
      form.description,
      '', // todo ipfs,
      form.category,
    );
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
        <styles.CancelBtn onClick={closeModal}>
          Cancel
        </styles.CancelBtn>
        <styles.SaveCaseBtn
          disabled={!canSubmit}
          onClick={handleClick}
        >
          Save Case
        </styles.SaveCaseBtn>
      </styles.Footer>
    </ModalWrapper>
  );
}
