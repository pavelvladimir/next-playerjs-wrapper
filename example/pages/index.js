import React, { useState } from 'react'

import { MainExample } from '../components/MainExample.js'
import { AutoplayExample } from '../components/AutoplayExample.js'

const Homepage = () => {
  const [currentSection, setCurrentSection] = useState('main')

  const changeSection = (event, key) => {
    event.preventDefault()
    setCurrentSection(key)
  }

  const navigationList = [
    { key: 'main', title: 'Main Example' },
    { key: 'autoplay', title: ' Autoplay Example' },
  ]

  return (
    <>
      <main>
        <h1 style={{ textAlign: 'center' }}>Next.js wrapper for playerjs</h1>
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
          {navigationList.map((item, i) => (
            <li style={{ display: 'inline-block', padding: '0 0.5rem' }} key={i}>
              <a
                href="#"
                style={{
                  color: currentSection === item.key ? '#ff0002' : '#3980f2',
                  textDecoration: 'none',
                }}
                onClick={(event) => changeSection(event, item.key)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {currentSection === 'main' && <MainExample />}

        {currentSection === 'autoplay' && <AutoplayExample />}
      </main>
    </>
  )
}

export default Homepage
