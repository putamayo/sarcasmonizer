import './style.css';
import Icon from "./Icon.png";

export const NoHistory = () => {
  return (
    <div className='no-history'>
      <div>
        <img src={Icon} alt='Logo' />
      <p>
        Your previously sarcasmonized text will be showed here ‘cause why not ¯\_(ツ)_/¯
      </p>
    </div>  
  </div>
  );
};