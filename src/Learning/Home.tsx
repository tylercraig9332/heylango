import React from 'react'
import AppPreview from './AppPreview'

export default function Home() {
    return (
        <div>
            <h1>Learning Dashboard</h1>
            <hr></hr>
            <h3>Learning Resources</h3>
            <div style={appContainerStyle}>
                <AppPreview title="Langos" description="Native Learning Sheets" icon="read" path="/learn/m/home"/>
                <AppPreview title="BiLangos" description="Bilingual Learning Sheets" icon="read" path="/learn/bi"/>
                <AppPreview title="VidLangos" description="Interactive Learning Videos" icon="youtube" path="/learn/vid"/>
                <AppPreview title="Collections" description="Collections of Lango Resources" icon="book" path="/learn/collections" />
            </div>
            <hr></hr>
            <h3>Review / Study</h3>
            <div style={appContainerStyle}>
                <AppPreview title="Vocab" description="Vocabulary Sheets" icon="file-done" path="/study/voc"/>
                <AppPreview title="Quiz" description="Custom Quizzes" icon="profile" path="/study/q"/>
                <AppPreview title="Decks" description="Flash Card Decks" icon="schedule" path="/study/decks"/>
            </div>
            <hr></hr>
        </div>
    )
}

const appContainerStyle = {
    display: 'flex'
} as React.CSSProperties