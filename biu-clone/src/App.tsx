import { useState, useEffect } from 'react'
import { useHref, useNavigate, useRoutes } from "react-router";

import { HeroUIProvider, ToastProvider } from "@heroui/react";


import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import routes from './routes';
import Theme from './components/theme';

export function App() {
  const [version, setVersion] = useState('加载中...')

  const routeElement = useRoutes(routes)
  const navigate = useNavigate();

  useEffect(() => {
    if (window.electron.getAppVersion) {
      window.electron.getAppVersion().then((v) => {
        setVersion(v)
      })
    }
  }, [])

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref} locale='zh-CN'>
      <ToastProvider
        placement='bottom-right'
        toastOffset={90}
        maxVisibleToasts={3}
        toastProps={{ timeout: 2000, color: "primary"}}
        regionProps={{
          classNames: {
            base: "z-[99999]"
          },
        }}
      />
      {/* {routeElement} */}
      <Theme>{routeElement}</Theme>
    </HeroUIProvider>
  )
}

export default App
