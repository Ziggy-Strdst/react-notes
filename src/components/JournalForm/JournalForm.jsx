import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';

function JournalForm({ onAddItem }) {
  const [validState, setValidState] = useState({
    title: true,
    text: true,
  });
  let isValid = true;
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (!formProps.title?.trim().length) {
      setValidState((state) => ({ ...state, title: false }));
      isValid = false;
    } else {
      setValidState((state) => ({ ...state, title: true }));
      isValid = true;
    }
    if (!formProps.text?.trim().length) {
      setValidState((state) => ({ ...state, text: false }));
      isValid = false;
    } else {
      setValidState((state) => ({ ...state, text: true }));
      isValid = true;
    }

    if (!isValid) return;

    onAddItem(formProps);
  };
  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          name='title'
          className={`${styles['input-title']} ${
            validState.title ? '' : styles['invalid']
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
        name='text'
        id=''
        cols='30'
        rows='10'
        className={`${styles['input']} ${
          validState.text ? '' : styles['invalid']
        }`}
      ></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
