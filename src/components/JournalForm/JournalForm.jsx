import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ onAddItem, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;
  const titleRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusValid = () => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { ...data },
    });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.text) {
      focusValid(isValid);
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
      dispatchForm({
        type: 'SET_VALUE',
        payload: { userId },
      });
    }
  }, [isFormReadyToSubmit, values, onAddItem, userId]);

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId },
    });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId },
    });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['form-row']}>
        <input
          type='text'
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          name='title'
          className={`${styles['input-title']} ${
            isValid.title ? '' : styles['invalid']
          }`}
        />
        {data.id && (
          <button
            className={styles.delete}
            type='button'
            onClick={() => deleteJournalItem()}
          >
            <img src='/archive-round.svg' alt='Кнопка удалить' />
          </button>
        )}
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
        ref={textRef}
        onChange={onChange}
        value={values.text}
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
