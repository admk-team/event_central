import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { get } from 'lodash'
import { useLaravelReactI18n } from 'laravel-react-i18n'

import languages from '../../common/languages' // your flags/codes

const LanguageDropdown: React.FC = () => {
  const { currentLocale, setLocale } = useLaravelReactI18n()
  const [isOpen, setIsOpen] = useState(false)

  // on mount, prefer saved choice (if any)
  useEffect(() => {
    const stored = localStorage.getItem('I18N_LANGUAGE')
    if (stored && stored !== currentLocale()) setLocale(stored)
  }, [])

  const selectedLang = currentLocale() // <- function, not property

  const changeLanguageAction = (lang: string) => {
    setLocale(lang)                       // updates context + re-renders
    localStorage.setItem('I18N_LANGUAGE', lang)

    // keep document attributes in sync (and support RTL if you mark it)
    document.documentElement.lang = lang
    document.documentElement.dir = (languages as any)[lang]?.rtl ? 'rtl' : 'ltr'
  }

  return (
    <Dropdown
      show={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className="ms-1 topbar-head-dropdown header-item"
    >
      <Dropdown.Toggle className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle arrow-none" as="button">
        <img
          src={get(languages, `${selectedLang}.flag`)}
          alt="Header Language"
          height="20"
          className="rounded"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="notify-item language py-2">
        {Object.keys(languages).map((key) => (
          <Dropdown.Item
            key={key}
            onClick={() => changeLanguageAction(key)}
            className={`notify-item ${selectedLang === key ? 'active' : ''}`}
          >
            <img
              src={get(languages, `${key}.flag`)}
              alt={get(languages, `${key}.label`)}
              className="me-2 rounded"
              height="18"
            />
            <span className="align-middle">{get(languages, `${key}.label`)}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageDropdown
