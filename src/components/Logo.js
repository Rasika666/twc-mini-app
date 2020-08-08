import React from 'react'

import twcLogo from '../img/logo-new/logo-new.png'

function Logo() {
    return (
        <header className="header">
            <div className="header__logo-container">
                <img src={twcLogo} alt="logo" />
            </div>
            <div className="header__title">
                test <span>project</span>
            </div>
        </header>
    )
}

export default Logo
