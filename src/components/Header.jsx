import React from 'react';

function Header({ onOpenPopup }) {
  return (
    <div className="header">
      <h2 className="header__title">Super Todo List</h2>
      <button className="header__button" onClick={onOpenPopup}>
        Create new list
      </button>
    </div>
  );
}

export default Header;
