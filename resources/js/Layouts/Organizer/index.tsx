import React from 'react'
import OrganizerProfileDropdown from '../../Components/Common/OrganizerProfileDropdown'

export default function Index({children} : any) {
  return (
    <React.Fragment>
        <div id="layout-wrapper">
          <header className="page-topbar border-bottom d-flex justify-content-end">
            <OrganizerProfileDropdown></OrganizerProfileDropdown>
          </header>
            <div className="main-content">
                {children}
            </div>
        </div>
    </React.Fragment>
  )
}
