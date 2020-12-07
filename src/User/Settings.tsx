import React, { useState } from 'react'
import BadgeSettings from './Badge/Settings'
import LanguageSettings from './LanguageSetting'

export default function Settings() {
    return (
        <div style={{width: 1000, marginRight: 'auto', marginLeft: 'auto', maxWidth: '95%'}}>
            <h1>Settings</h1>
            <hr></hr>
            <LanguageSettings />
            <br></br>
            <BadgeSettings />
        </div>
    )
}