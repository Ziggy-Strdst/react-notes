import SelectUser from '../SelectUser/SelectUser';
import './Header.css';

function Header() {
  return (
    <>
      <img className='logo' src='/logo.svg' alt='Логотип' />
      <SelectUser />
    </>
  );
}

export default Header;
