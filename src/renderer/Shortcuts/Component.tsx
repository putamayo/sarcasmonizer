import React from 'react';
import { animated, easings, useSpring } from 'react-spring';
import { hasValue } from 'utils/helpers';
import './style.css';

interface Props {
  disableAll: boolean
  disableExtra: boolean
  disableControls: boolean
  shortcutMenuOpen: boolean
  keys: {
    handleCmdEnterPress: () => void
    handleEnterPress: () => void
    handleSlashPress: () => void
    handleKPress: () => void
    handleUpPress: () => void
    handleDownPress: () => void
  }
}

export const Shortcuts = ({ disableAll, disableExtra, disableControls, shortcutMenuOpen, keys }: Props) => {
  const ref = React.useRef<HTMLUListElement>(null)
  const returnHeight = (): number => {
    if (ref.current) {
      const measurements = ref.current.getBoundingClientRect()
      const { height } = measurements
      return height
    }
    return 0
  }

  const props = useSpring({
    to: { translateY: shortcutMenuOpen ? '0px' : `${returnHeight() + 4}px`, opacity: shortcutMenuOpen ? 1 : 0 },
    config: shortcutMenuOpen ? {
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
    <div className='shortcuts'>
      <div className='bg-shortcuts' />
      <animated.ul style={props} className='menu-shortcuts' ref={ref}>
        <li onClick={() => keys.handleEnterPress()} className={hasValue(disableAll) && disableAll ? 'disabled' : 'pointer'}>
          Sarcasmonize & copy
          <span className='group'>
            <span className='key'>↩</span>
          </span>
        </li>
        <li onClick={() => keys.handleCmdEnterPress()} className={hasValue(disableExtra) && disableExtra ? 'disabled' : 'pointer'}>
          Copy selected
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>↩</span>
          </span>
        </li>
        <li onClick={() => keys.handleSlashPress()} className={hasValue(disableExtra) && disableExtra ? 'disabled' : 'pointer'}>
          Re-sarcasmonize
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>/</span>
          </span>
        </li>
        <li className={hasValue(disableControls) && disableControls ? 'disabled' : ''}>
          Move through list
          <span className='group'>
            <span onClick={() => keys.handleDownPress()} className='key pointer'>↓</span>
            <span onClick={() => keys.handleUpPress()} className='key pointer'>↑</span>
          </span>
        </li>
      </animated.ul>

      <ul className='part-shortcuts'>
        <li className='pointer' onClick={() => keys.handleKPress()}>
          Show shortcut overview
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>K</span>
          </span>
        </li>
      </ul >
      <ul className='full-shortcuts'>
        <li className={hasValue(disableControls) && disableControls ? 'disabled' : ''}>
          Move through list
          <span className='group'>
            <span onClick={() => keys.handleDownPress()} className='key pointer'>↓</span>
            <span onClick={() => keys.handleUpPress()} className='key pointer'>↑</span>
          </span>
        </li>
        <li className='divider' />

        <li onClick={() => keys.handleSlashPress()} className={hasValue(disableExtra) && disableExtra ? 'disabled' : 'pointer'}>
          Re-sarcasmonize
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>/</span>
          </span>
        </li>
        <li className='divider' />

        <li onClick={() => keys.handleCmdEnterPress()} className={hasValue(disableExtra) && disableExtra ? 'disabled' : 'pointer'}>
          Copy selected
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>↩</span>
          </span>
        </li>
        <li className='divider' />

        <li onClick={() => keys.handleEnterPress()} className={hasValue(disableAll) && disableAll ? 'disabled' : 'pointer'}>
          Sarcasmonize & copy
          <span className='group'>
            <span className='key'>↩</span>
          </span>
        </li>
      </ul>
    </div >

  );
};