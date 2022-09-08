import CreateCaseModal, { ICreateCaseModal } from 'shared/components/Modals/CreateCaseModal';

export enum EModals {
  CREATE_CASE_MODAL = 'CREATE_CASE_MODAL',
  EMPTY = 'EMPTY',
}

export type IModalsProps = {
  [EModals.CREATE_CASE_MODAL]: ICreateCaseModal;
  [EModals.EMPTY]: any;
};
export type ModalProps<T extends EModals> = Omit<IModalsProps[T], 'closeModal'>;

type IModals = {
  [EModals.CREATE_CASE_MODAL]: React.FC<ICreateCaseModal>;
  [EModals.EMPTY]: any;
};

export const MODALS: IModals = {
  [EModals.CREATE_CASE_MODAL]: CreateCaseModal,
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
  modal: EModals.EMPTY,
  props: null,
};
