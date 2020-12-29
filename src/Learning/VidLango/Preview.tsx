import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IVidLango from './VidLango'
import { Card, message, Tag } from 'antd'
import { parseCategoryId, parseLanguageCode, parseLanguageFlag } from '../../Util/functions'
import { Like, Share, Save } from '../../Toolbar/Icons'

type PreviewProps = {
    vidLango : IVidLango
}

export default function Preview(props : PreviewProps) {

    const [hover, setHover] = useState<boolean>(false)
    const [thumb, setThumb] = useState<string>('') // tODO: replace with default url to use

    useEffect(() => {
        if (props.vidLango.meta?.thumbnails === undefined) return
        const thumbs = JSON.parse(props.vidLango.meta?.thumbnails)
        setThumb(thumbs.medium.url)
    }, [])

    if (props.vidLango === undefined || props.vidLango.meta === undefined) return null

    let captionMap;
    if (props.vidLango.captionsAvaliable.length > 0)  {
        captionMap = props.vidLango.captionsAvaliable.map((caption) => {
            return <span key={caption} style={{margin: '0px 5px 0xp 5px'}}><Tag color="blue">{parseLanguageCode(caption)}</Tag></span>
        })
    } else {
        captionMap = <span key="nocap" style={{margin: '0px 5px 0xp 5px'}}><Tag color="red">No Captions :(</Tag></span>
    }
    

    return (
        <Card style={(hover) ? cardHover : notHover} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} hoverable>
            <Link style={{color: 'inherit'}} to={`/learn/vid/${props.vidLango._id}`}>
            <h2 style={{padding: '0px 15px 20px 15px'}}>{props.vidLango.meta.title}</h2>
            <div style={{display: 'flex', width: '552px', justifyContent: 'center', alignItems: 'start'}}><img src={thumb} /></div>
            <div>
                <Line><strong>Audio </strong>{parseLanguageCode(props.vidLango.language)} {parseLanguageFlag(props.vidLango.language)}</Line>
                <Line><strong> Captions </strong> {captionMap}</Line>
                <Line><strong> Category </strong> {parseCategoryId(props.vidLango.meta.categoryId)}</Line>
            </div>
        </Link>
            <div style={toolbar}>
                <Like parent_id={props.vidLango._id} likes={props.vidLango.likes}/>
                <Save parent_id={props.vidLango._id} parentType='VidLango' />
                <Share parent_id={props.vidLango._id} parentType="VidLango" />
            </div>        
        </Card>
    )
}

function Line(props : {children : any}) {
    return <div style={{margin: 0}}>{props.children}</div>
}

const cardWrapper = {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px',
    minHeight: '300px',
    width: '600px',
    paddingTop: 0,
    alignItems: 'start',
    paddingBottom: '65px'
} as React.CSSProperties

const notHover = {
    border: '1px solid #d9d9d9',
    borderRadius: '8px',
    ...cardWrapper
} as React.CSSProperties

const cardHover = {
    border: '1px solid #1890ff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px fade(#1890ff, 20%)',
    ...cardWrapper
} as React.CSSProperties

const toolbar = {
    width: '552px',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    listStyle: 'none',
    border: '1px solid #e8e8e8',
    borderRadius: '5px',
    zoom: 1,
    position: 'absolute', bottom: 24 // Moves to bottom of card
} as React.CSSProperties
