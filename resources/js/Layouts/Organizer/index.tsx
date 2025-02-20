import React from 'react'

export default function Index({children} : any) {
  return (
    <React.Fragment>
        <div id="layout-wrapper">
            <div className="main-content">
                {children}
            </div>
        </div>
    </React.Fragment>
  )
}
