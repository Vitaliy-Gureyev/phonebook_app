import React, { FC } from 'react';
import { IPhonebook } from '../../models/IPhonebook';
import styles from './subsribleTable.module.css';

interface IProps {
  phonebook: IPhonebook[];
  handleEdit: (el: IPhonebook, index: number) => void;
  handleDelete: (id: number) => void;
}

export const SubscriberTableComponent: FC<IProps> = ({ phonebook, handleEdit, handleDelete }) => {
  return (
    <table>
      <tbody>
        {phonebook.map((el, index) => (
          <tr key={el.id}>
            <td className={styles.name}>
              <article>{el.name}</article>
            </td>
            <td>
              <p>{el.phone}</p>
            </td>
            <td className={styles.buttons}>
              <button className={styles.editButton} onClick={() => handleEdit(el, index)}>
                Ред.
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(el.id)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
