import './style.css';
import Icon from "./icon.svg";
import { animated, easings, useSpring } from 'react-spring';

export const NotificationElement = ({ open }: { open: boolean }) => {
  const props = useSpring({
    to: {
      translateY: open ? '0px' : `44px`,
      opacity: open ? 1 : 0,
      translateX: '-50%'
    },
    config: open ? {
      duration: 300,
      mass: 1,
      damping: 60,
      stiffness: 1600
    } : {
      duration: 200,
      easing: easings.easeOutCubic,
    }
  })
  return (
    <animated.div style={props} className='notification'>
      <img src={Icon} alt='Logo' height='16' width='16' />
      <p>
        Paste your text anywhere
      </p>
    </animated.div>
  );
};