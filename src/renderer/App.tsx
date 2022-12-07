import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { generateSeed, hasValue, makeId, makeSarcastic } from 'utils/helpers';
import { useLocalStorage } from 'utils/use-local-storage';
import useWindowSize from 'utils/use-window-dimensions';
import './App.css';
import { Authors } from './Authors/Component';
import { NoHistory } from './NoHistory/Component';
import { NotificationElement } from './Notification/Component';
import { Shortcuts } from './Shortcuts/Component';

interface SarcasticValue {
  id: string
  rawValue: string
  seed: boolean[]
}

const Sarcasmonizer = () => {
  const [value, setValue] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [items, setItems] = useLocalStorage<SarcasticValue[]>("Sarcasmonizer", []);
  const [shortcutMenuOpen, setShortcutMenuOpen] = React.useState<boolean>(false)
  const [notificationOpen, setNotificationOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (notificationOpen) {
      let timer1 = setTimeout(() => setNotificationOpen(false), 1000);
      return () => {
        clearTimeout(timer1);
      };
    }
    return () => { }
  }, [notificationOpen]);

  const handleDeleteStorage = () => {
    console.log('We fire the DeleteStorage')
    setItems([]);
  }

  const handleEnterPress = () => {
    console.log('We fire the Sarcasm')
    setShortcutMenuOpen(false)
    if (value.length > 0) {
      const newId = makeId(10)
      const newSeed = generateSeed()
      const obj = makeSarcastic(value, newSeed);
      navigator.clipboard.writeText(obj);
      setNotificationOpen(true)

      setItems([{
        id: newId ?? '',
        rawValue: value,
        seed: newSeed
      }, ...items]);
      setValue('')
      setActiveId(newId)
    }
  }

  const handleSlashPress = () => {
    console.log('We fire the ReSarcasm')
    setShortcutMenuOpen(false)
    const item = items.find(item => item.id === activeId)
    if (hasValue(item)) {
      const newSeed = generateSeed()
      const obj = makeSarcastic(item.rawValue, newSeed);
      navigator.clipboard.writeText(obj);
      setNotificationOpen(true)
      const newItems = [...items].map(item => {
        if (item.id === activeId) {
          return {
            id: item.id,
            rawValue: item.rawValue,
            seed: newSeed
          }
        }
        return item
      })
      setItems(newItems);
    }
  }

  const handleKPress = () => {
    console.log('We fire the shortcutmenu')
    setShortcutMenuOpen(old => !old)
  }

  const handleCmdEnterPress = () => {
    setShortcutMenuOpen(false)
    console.log('We fire the Copy')
    const item = items.find(item => item.id === activeId)
    if (hasValue(item)) {
      const obj = makeSarcastic(item.rawValue, item.seed);
      navigator.clipboard.writeText(obj);
      setNotificationOpen(true)
    }
  }
  const handleUpPress = () => {
    console.log('We fire the ArrowUp')
    runArrowUp();
  }
  const handleDownPress = () => {
    console.log('We fire the ArrowDown')
    runArrowDown();
  }

  const keys = {
    handleCmdEnterPress: handleCmdEnterPress,
    handleEnterPress: handleEnterPress,
    handleSlashPress: handleSlashPress,
    handleKPress: handleKPress,
    handleUpPress: handleUpPress,
    handleDownPress: handleDownPress,
    handleDeleteStorage: handleDeleteStorage
  }

  const handleKeyPress = React.useCallback((event) => {
    // console.log(event.code)
    if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
      event.preventDefault();
      keys.handleCmdEnterPress()
    } if ((event.metaKey || event.ctrlKey) && event.code === 'KeyF') {
      event.preventDefault();
      keys.handleDeleteStorage()
    } else if ((event.metaKey || event.ctrlKey) && event.code === 'Slash') {
      event.preventDefault();
      keys.handleSlashPress()
    } else if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
      event.preventDefault();
      keys.handleKPress();
    } else if (event.code === 'Enter') {
      event.preventDefault();
      keys.handleEnterPress();
    } else if (event.code === 'ArrowUp') {
      event.preventDefault()
      keys.handleUpPress()
    } else if (event.code === 'ArrowDown') {
      event.preventDefault()
      keys.handleDownPress()
    }
  }, [value, activeId]);

  const runArrowDown = () => {
    const currentIndex = items.findIndex(item => item.id === activeId)
    const nextIndex = currentIndex === -1 ? 0 : currentIndex === items.length - 1 ? 0 : (currentIndex + 1)
    setActiveId(items[nextIndex].id ?? '')
  }

  const runArrowUp = () => {
    const currentIndex = items.findIndex(item => item.id === activeId)
    const prevIndex = currentIndex === -1 ? items.length - 1 : (currentIndex === 0) ? items.length - 1 : (currentIndex - 1)
    setActiveId(items[prevIndex].id ?? '')
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleChange = (e: any) => {
    setShortcutMenuOpen(false)
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  React.useEffect(() => {
    if (!hasValue(activeId)) {
      setActiveId(makeId(10))
    }
  }, [])


  const windowSize = useWindowSize();

  const input = React.useRef<HTMLInputElement>(null)
  // React.useEffect(() => {
  //   if (document.activeElement !== input.current) {
  //     input.current!.focus()
  //   }
  // }, [document.activeElement])


  React.useEffect(() => {
    setShortcutMenuOpen(false)
  }, [windowSize.isDesktop])

  return (
    <div className='content'>
      <form onSubmit={handleSubmit} method='post'>
        <input
          ref={input}
          autoFocus
          type='text'
          tabIndex={1}
          placeholder="Write something and make it look saRcAstiC"
          value={value}
          onChange={handleChange}
          onBlur={() => input.current!.focus()}
        />
      </form>
      <div className='history'>
        <div className='raw'>
          <h3>Sarcasmonized history</h3>
          {Object.entries(items).length === 0 && (<NoHistory />)}
          {Object.entries(items).length !== 0 && (
            <ul>
              {Object.entries(items).map((item: [string, SarcasticValue]) => {
                const [key, value] = item;
                return (
                  <li
                    key={key}
                    className={activeId === value.id ? 'is-active' : ''}
                    onClick={() => setActiveId(value.id)}
                    onDoubleClick={() => {
                      setActiveId(value.id)
                      keys.handleCmdEnterPress()
                    }}
                  >
                    {value.rawValue}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className='sarcasm'>
          {Object.entries(items).length !== 0 && Object.entries(items).map((item: [string, SarcasticValue]) => {
            const [key, value] = item;

            return activeId === value.id ? (
              <p key={key}>
                {makeSarcastic(value.rawValue, value.seed)}
              </p>
            ) : (<></>)
          })
          }
        </div>
      </div>
      <Shortcuts disableAll={value.length === 0} keys={keys} shortcutMenuOpen={shortcutMenuOpen && !windowSize.isDesktop} disableExtra={items.filter(item => item.id === activeId).length === 0} disableControls={items.length === 0} />
      <Authors />
      <NotificationElement open={notificationOpen} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sarcasmonizer />} />
      </Routes>
    </Router>
  );
}
