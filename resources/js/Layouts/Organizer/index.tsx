import React from 'react'
import OrganizerProfileDropdown from '../../Components/Common/OrganizerProfileDropdown'
import { Toaster } from 'react-hot-toast';
import useToastMessages from '../../hooks/useToastMessages';

export default function Index({children} : any) {
  useToastMessages();

  return (
    <React.Fragment>
        <div id="layout-wrapper">
          <header className="page-topbar border-bottom d-flex justify-content-end">
            <OrganizerProfileDropdown></OrganizerProfileDropdown>
          </header>
            <div className="">
                {children}
            </div>
        </div>
        <Toaster />
    </React.Fragment>
  )
}
