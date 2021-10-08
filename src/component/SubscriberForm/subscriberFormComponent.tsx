import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPhonebook } from '../../models/IPhonebook';
import InputMask from 'react-input-mask';
import styles from './subsribleForm.module.css';

interface IProps {
  submit: (data: IPhonebook) => void;
  initialValue: {
    name: string;
    phone: string;
    id: number;
  };
}

export const SubscriberFormComponent: FC<IProps> = ({ submit, initialValue }) => {
  const { register, handleSubmit, control, reset, formState } = useForm({
    defaultValues: {
      name: initialValue.name,
      phone: initialValue.phone,
      id: initialValue.id,
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ ...initialValue });
    }
  }, [formState.isSubmitSuccessful, initialValue, reset]);

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <div className={styles.allInputsContainer}>
        <div className={styles.inputItem}>
          <input {...register('name', { required: true, maxLength: 20 })} />
          <div className={styles.error}>{formState.errors.name?.type === 'required' && 'Имя обязательно'}</div>
          <div className={styles.error}>{formState.errors.name?.type === 'maxLength' && 'Не более 20 символов'}</div>
        </div>
        <div className={styles.inputItem}>
          <Controller
            rules={{ required: true, minLength: 17 }}
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              // @ts-ignore
              <InputMask mask="+38 099 999 99 99" value={value} onChange={onChange} maskChar={null}>
                {() => <input type="tel" className="input" />}
              </InputMask>
            )}
          />
          <div className={styles.error}>{formState.errors.phone?.type === 'required' && 'Телефон обязателен'}</div>
          <div className={styles.error}>
            {formState.errors.phone?.type === 'minLength' && 'Укажите телефон в правильном формате'}
          </div>
        </div>
      </div>
      <input {...register('id')} disabled={true} type="hidden" />
      <button type="submit" className={styles.submitButton}>
        Добавить
      </button>
    </form>
  );
};
