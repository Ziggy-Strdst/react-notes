import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton() {
  return (
    <CardButton className='journal-add'>
      <img src='/plus.svg' alt='' />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
