import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

// const INITIAL_DATA = [
// {
// "id": 1,
// "title": "Подготовка к обновлению курсов",
// "text": "Сегодня провёл весь день за...",
// "date": '2024/03/15',
// },
// {
// "id": 2,
// "title": "Второй пост",
// "text": "Че-то было",
// "date": '2024/03/15',
// },
// {
//   id: 2,
//   title: 'Поход в годы',
//   text: 'Думал, что очень много време...',
//   date: new Date(),
// },
// ];

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItems(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem('data', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems((old) => [
      ...old,
      {
        title: item.title,
        text: item.text,
        date: item.date ? new Date(item.date) : new Date(),
        id: old.length > 0 ? Math.max(...old.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onAddItem={addItem} />
      </Body>
    </div>
  );
}

export default App;
