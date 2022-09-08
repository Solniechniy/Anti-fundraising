import { useState } from 'react';

import { useCaseService } from 'providers/CaseContractServiceProvider';
import { Chain } from 'providers/interfaces';
import { useWalletData } from 'providers/NearWalletProvider';

import InputContainer from '../InputContainer';
import Select from '../InputContainer/Select';
import ModalWrapper from '../ModalWrapper';
import styles from './style';

export interface ICreateAddressModal {
  closeModal: () => void;
  caseId: number,
}

const initialFormValue = {
  blockchain: Chain.None,
  address: '',
};

export interface IForm {
  blockchain: Chain,
  address: string,
}

export default function CreateAddressModal({ closeModal, caseId }: ICreateAddressModal) {
  const { isSignedIn } = useWalletData();
  const { createAddress } = useCaseService();
  const [form, setForm] = useState<IForm>(initialFormValue);
  const chainArray = Object.values(Chain).slice(1);
  const canSubmit = isSignedIn && form.address && form.blockchain !== Chain.None;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const handleClick = async () => {
    await createAddress(
      form.blockchain,
      '',
      form.address,
      caseId,
    );
  };
  return (
    <ModalWrapper
      closeModal={closeModal}
      isCentered
      color="#36363D"
    >
      <styles.Header>
        <p>New Address</p>
        <styles.Close onClick={closeModal}>
          <styles.CloseIcon />
        </styles.Close>
      </styles.Header>
      <styles.Body>
        <Select
          category={chainArray}
          title="Select Blockchain"
          handleChange={handleChange}
          name="blockchain"
        />
        <InputContainer
          value={form.address}
          title="Address"
          handleChange={handleChange}
          name="address"
        />
      </styles.Body>
      <styles.Footer>
        <styles.SaveCaseBtn
          disabled={!canSubmit}
          onClick={handleClick}
        >
          Save Address
        </styles.SaveCaseBtn>
      </styles.Footer>
    </ModalWrapper>
  );
}
