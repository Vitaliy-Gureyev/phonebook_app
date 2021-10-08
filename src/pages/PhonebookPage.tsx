import React, { useEffect, useState } from 'react';
import { IPhonebook } from '../models/IPhonebook';
import { api } from '../api/api';
import { SubscriberFormComponent } from '../component/SubscriberForm';
import { EditSubscriberComponent } from '../component/EditSubscriber';
import { SubscriberTableComponent } from '../component/SubscriberTable';
import styles from './PhoneBook.module.css';

const PhonebookPage = () => {
  const [phonebook, setPhonebook] = useState<IPhonebook[]>([]);
  const [editableSubscriber, setEditableSubscriber] = useState({ name: '', phone: '', id: 0, index: 0 });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      api.getPhonebook().then((data) => {
        const phonebook = data.data;
        setPhonebook(phonebook);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  const submitNewSubscriber = (data: IPhonebook) => {
    let newState = [...phonebook];
    let id;
    if (phonebook.length === 0) {
      id = 0;
    } else {
      id = newState[newState.length - 1].id + 1;
    }
    setPhonebook([...newState, { ...data, id: id }]);
  };

  const handleDelete = (id: number) => {
    let newState = [...phonebook].filter((item) => item.id !== id);
    setPhonebook(newState);
  };

  const handleEdit = (el: IPhonebook, index: number) => {
    setModalIsOpen(true);
    setEditableSubscriber({ ...el, index: index });
  };

  const handleEditSubmit = (data: IPhonebook) => {
    let newState = [...phonebook];
    newState[editableSubscriber.index] = {
      name: data.name,
      phone: data.phone,
      id: data.id,
    };
    setPhonebook(newState);
    setModalIsOpen(false);
  };

  if (isLoading) {
    return <div className={styles.loader}>loading...</div>;
  }

  return (
    <div className={styles.phonebookContainer}>
      <SubscriberFormComponent submit={submitNewSubscriber} initialValue={{ name: '', phone: '', id: 0 }} />
      <SubscriberTableComponent phonebook={phonebook} handleEdit={handleEdit} handleDelete={handleDelete} />
      <EditSubscriberComponent
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        subscriber={editableSubscriber}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default PhonebookPage;
