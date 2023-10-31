import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onAddItem }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.text) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onAddItem(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onAddItem]);

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          value={values.title}
          onChange={onChange}
          name='title'
          className={`${styles['input-title']} ${
            isValid.title ? '' : styles['invalid']
          }`}
        />
      </div>
      <div className={styles['form-row']}>
        <label className={styles['form-label']} htmlFor='date'>
          <img src='/date.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <input type='date' name='date' id='date' className={styles.input} />
      </div>
      <div className={styles['form-row']}>
        <label className={styles['form-label']} htmlFor='tag'>
          <img src='/tag.svg' alt='Иконка папки' />
          <span>Метки</span>
        </label>
        <input type='text' name='tag' id='tag' className={styles.input} />
      </div>

      <textarea
        value={values.text}
        onChange={onChange}
        name='text'
        id='text'
        cols='30'
        rows='10'
        className={`${styles['input']} ${
          isValid.text ? '' : styles['invalid']
        }`}
      ></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
