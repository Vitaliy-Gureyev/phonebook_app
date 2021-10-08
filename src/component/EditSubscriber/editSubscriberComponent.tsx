import React, { FC } from 'react';
import Modal from 'react-modal';
import { IPhonebook } from '../../models/IPhonebook';
import { SubscriberFormComponent } from '../SubscriberForm';
import styles from './editSubscriber.module.css';

interface IProps {
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
  subscriber: IPhonebook;
  onSubmit: (data: IPhonebook) => void;
}

export const EditSubscriberComponent: FC<IProps> = ({ modalIsOpen, setModalIsOpen, subscriber, onSubmit }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={styles.modalContainer}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <SubscriberFormComponent
          submit={onSubmit}
          initialValue={{ name: subscriber.name, phone: subscriber.phone, id: subscriber.id }}
        />
        <button className={styles.cancelButton} onClick={() => setModalIsOpen(false)}>
          Отмена
        </button>
      </Modal>
    </div>
  );
};
