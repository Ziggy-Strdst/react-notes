import './JournalItem.css';

function JournalItem({ title, text, date }) {
  const formatedDate = date.toLocaleDateString();
  return (
    <>
      <h2 className='journal-item__header'>{title}</h2>
      <div className='journal-item__body'>
        <div className='journal-item__date'>{formatedDate}</div>
        <div className='journal-item__text'>{text}</div>
      </div>
    </>
  );
}

export default JournalItem;
