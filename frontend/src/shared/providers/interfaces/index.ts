import CreateAddressModal, { ICreateAddressModal } from 'shared/components/Modals/CreateAddressModal';
import CreateCaseModal, { ICreateCaseModal } from 'shared/components/Modals/CreateCaseModal';

export enum EModals {
  CREATE_CASE_MODAL = 'CREATE_CASE_MODAL',
  CREATE_ADDRESS_MODAL = 'CREATE_ADDRESS_MODAL',
  EMPTY = 'EMPTY',
}

export type IModalsProps = {
  [EModals.CREATE_CASE_MODAL]: ICreateCaseModal;
  [EModals.CREATE_ADDRESS_MODAL]: ICreateAddressModal;
  [EModals.EMPTY]: any;
};
export type ModalProps<T extends EModals> = Omit<IModalsProps[T], 'closeModal'>;

type IModals = {
  [EModals.CREATE_CASE_MODAL]: React.FC<ICreateCaseModal>;
  [EModals.CREATE_ADDRESS_MODAL]: React.FC<ICreateAddressModal>;
  [EModals.EMPTY]: any;
};

export const MODALS: IModals = {
  [EModals.CREATE_CASE_MODAL]: CreateCaseModal,
  [EModals.CREATE_ADDRESS_MODAL]: CreateAddressModal,
  [EModals.EMPTY]: null,
};

export type ModalContextType = {
  modal: EModals;
  props: IModalsProps[EModals];
  showModal: <T extends EModals>(modal: T, props: ModalProps<T>) => void;
  closeModal: () => void;
};

export interface IInternalProviderModalState {
  modal: EModals;
  props: IModalsProps[EModals];
}

export const initialModalState: IInternalProviderModalState = {
  modal: EModals.EMPTY, // todo EModals.EMPTY
  props: null,
};
