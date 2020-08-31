import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Lango from './Lango'
import { Card, Col, Row } from 'antd'

import Author from '../../User/Author'
import PreviewImage from '../../Util/ResourcePreviewImage'
import Loading from '../../Util/Loading'
import { parseLanguageCode, parseLanguageFlag } from '../../Util/functions'
import { Like, Save, EditOrUser } from '../../Toolbar/Icons'


export default function LangoPreview(props : {lango : Lango}) {

    const [loaded, setLoaded] = useState<boolean>(false)

    const toolbar = [
        <Like parent_id={props.lango._id} />,
        <Save parent_id={props.lango._id} parentType='lango' />,
    ]

    React.useEffect(() => {
        //console.log(props.lango)
        if (props.lango != undefined) {
            console.log(props.lango.description)
            setLoaded(true)
        }
    })

    if (!loaded) return <div style={wrapStyle}><Loading message="Loading Lango" /></div>
    return (
        <div style={wrapStyle} key={props.lango._id}>
                <Card 
                    actions={toolbar}
                    hoverable
                >
                    <Link to={`/learn/lango/${props.lango._id}`} style={{color: 'inherit'}}>
                    <Row type="flex">
                        <Col span={3}>
                            <PreviewImage src={props.lango.imageSrc} />
                        </Col>
                        <Col>
                            <Row type="flex" justify="start" align='middle'>
                                <h1>{props.lango.title}</h1>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{textOverflow: 'ellipsis'}}><strong>Description</strong> {props.lango.description}</div>
                                    <div><strong>Language </strong>{parseLanguageCode(props.lango.language)} {parseLanguageFlag(props.lango.language)}</div>
                                    <div><strong> Difficulty </strong>{props.lango.difficulty}</div>
                                    <div><strong> Author </strong></div>
                                </Col>
                                <Col>
                                    <Author user_id={props.lango.author} />
                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                    </Link>
                </Card>
        </div>
    )
}

const wrapStyle = {
    margin: '20px',
    width: '95%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '300px'
}