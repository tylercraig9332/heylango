import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import AppWrap from './styles/AppWrap'

import Nav from './Nav/Nav'
import PageHead from './Nav/PageHead'

import Launch from './pages/Launch'
import Land from './pages/Landing'
import Portal from './User/Portal'
import Signup from './User/Signup'
import Logout from './User/Logout'
import Profile from './User/Profile'
import Settings from './User/Settings'
import cHome from './Community/Home'
import cView from './Community/View'
import pCreate from './Post/Create'
import pView from './Post/View'
import lHome from './Learning/Home'
import biView from './Learning/BiLango/View'
import biCreate from './Learning/BiLango/Create'
import biHome from './Learning/BiLango/Home'

import mHome from './Learning/MonoLango/Home'
import mCreate from './Learning/MonoLango/Create'
import mView from './Learning/MonoLango/View'
import mEdit from './Learning/MonoLango/Edit'

import vCreate from './Learning/VidLango/Pages/Create'
import vView from './Learning/VidLango/Pages/View'
import vHome from './Learning/VidLango/Pages/Home'

import sHome from './Study/Home'
import dHome from './Study/Decks/Home'
import dView from './Study/Decks/View'
import dPresent from './Study/Decks/Review'
import eHome from './Study/Expression/Home'

import iHome from './pages/Info/Home'
import iLango from './pages/Info/Lango'
import iInteraction from './pages/Info/Interaction'
import iSRS from './pages/Info/SRS'
import iCEFR from './pages/Info/CEFR'
import iContent from './pages/Info/Content'

import Test from './pages/Test'
import Support from './pages/Support'
import Saved from './pages/Saved/Saved'

import Walkthrough from './Walkthrough/index'

import './styles/global.css'
const themes = {
    dark: `/api/static/styles/dark2.css`,
    light: `/api/static/styles/default.css`,
  };

export default function Routes() {
    // TODO: Would love to export certain routes in subtree components
    let defaultTheme = localStorage.getItem('theme')
    if (defaultTheme === null || defaultTheme === undefined) {
        defaultTheme = 'light'
    }
    const [theme, setTheme] = useState<string>(defaultTheme)
    useEffect(() => {
        // Pull in theme for ThemeSwitcherProvider
        let d = localStorage.getItem('theme')
        if (d !== null && d !== undefined) {
            setTheme(d)
            return
        }
        fetch('/api/u/setting').then(r => r.json()).then((settings: any) => {
            localStorage.setItem('theme', settings.theme)
            setTheme(settings.theme)
        })
    }, [])
    
    return (
        <BrowserRouter>
            <div>
                <ThemeSwitcherProvider themeMap={themes} defaultTheme={defaultTheme}>
                <Nav useLocation={useLocation}/>
                <AppWrap useLocation={useLocation}>
                    <Switch>
                        <Route exact path='/' component={Land} />
                        <Route exact path='/community/' component={cHome} />
                        <Route path='/community/p/new/' component={pCreate} />
                        <Route path='/community/p/' component={pView} />
                        <Route path='/community/' component={cView} />

                        <Route path='/portal' component={Portal} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/profile' component={Profile} />
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/saved' component={Saved} />

                        <Route path='/test' component={Test} />
                        
                        <Route exact path='/support' component={Support} />

                        <Route exact path='/learn/' component={lHome} />
                        {/*<Route exact path='/learn/bi/new' component={biCreate} />*/}
                        <Route exact path='/learn/bi/' component={biHome} />
                        <Route path='/learn/bi/' component={biView} />

                        <Route exact path='/learn/lango/home/' component={mHome} />
                        <Route path='/learn/lango/create' component={mCreate} />
                        <Route path='/learn/lango/edit' component={mEdit} />
                        <Route path='/learn/lango/' component={mView} />

                        <Route exact path='/learn/vid' component={vHome} />
                        <Route exact path='/learn/vid/create' component={vCreate} />
                        <Route path='/learn/vid/' component={vView} />

                        <Route exact path='/study/' component={sHome} />
                        <Route exact path='/study/decks/' component={dHome} />
                        <Route path='/study/decks/review' component={dPresent} />
                        <Route path='/study/decks/' component={dView} />
                        <Route exact path='/study/saved/' component={sHome} />
                        <Route exact path='/study/decks/' component={eHome} />
                        
                        <Route exact path='/info' component={iHome} />
                        <Route exact path='/info/lango' component={iLango} />
                        <Route exact path='/info/ip' component={iInteraction} />
                        <Route exact path='/info/srs' component={iSRS} />
                        <Route exact path='/info/cefr' component={iCEFR} />
                        <Route exact path='/info/content' component={iContent} />

                        <Route exact path='/walkthrough' component={Walkthrough} />
                    </Switch>
                </AppWrap>
                </ThemeSwitcherProvider>
            </div>
        </BrowserRouter>
    )
}