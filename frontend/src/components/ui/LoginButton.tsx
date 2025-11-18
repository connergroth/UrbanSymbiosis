// TODO: Create LoginButton component
import { useState } from 'react';

export default function LoginButton({ label }) {
  const [is_button_loading, set_button_loading] = useState(false);
  let button_text;

  function handleClick() {
    set_button_loading(true);
    console.log('Login Clicked');
  }

  if (is_button_loading) {
    button_text = 'Loading...';
  } else {
    button_text = label;
  }

  return <button className="bg-green-400 hover:bg-gray-400 focus:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>{button_text}</button>;
}