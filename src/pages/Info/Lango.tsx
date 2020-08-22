import React from 'react'
import { Typography, Divider, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Lango() {
    return (
        <div style={pageStyle}>
            <Row style={rowStyle}>
                <Col span={6} offset={6} style={colStyle}>
                <Title className="what">What are Langos?</Title>
                <Paragraph>
                    Langos provide language material that can be easily read, studied, or consumed in a manner that supports learning. 
                </Paragraph>
                <Paragraph>
                    Each Lango contians content that can be read in the WordViewer tool. The WordViewer tool allows for one to save words and phrases to be studied later.
                    It also can be customized to display as one sees fit. 
                </Paragraph>
                <Paragraph>
                    Some Langos contain companion YouTube videos. There are current plans for expanding Langos to support more companion features, such as Spotify player support.
                </Paragraph>
                <Divider />
                <Title className="how">How do I use Langos?</Title>
                <Paragraph>
                    Through extensivly reading, one can grow their passive vocabulary immeasurably, thusly resulting in a growth of active vocabulary. 
                </Paragraph>
                <Paragraph>
                    Also, by using the WordViewer tools, one can save vocabulary and phrases to use for later study. 
                </Paragraph>
                <Paragraph>
                    And for those up for the challenge, Langos can be used for intensive reading.
                </Paragraph>
                <Divider />
                <Title className="read">What is extensive/intensive reading?</Title>
                <Paragraph>
                    Extensive reading is the practice of reading for enjoyment in large quantities, or "extensivly", often with not having the intention of understanding every word and/or structure.
                </Paragraph>
                <Paragraph>
                    Intensive reading is the practice of reading in smaller quantities, so that one may study and understand the words and structures.
                </Paragraph>
                <Paragraph>
                    We reccomend you to glance over <a href="https://www.lucalampariello.com/intensive-vs-extensive-reading/" >this blog post</a> by the polyglot, Luca Lampariello, for a more in depth understanding 
                </Paragraph>
                </Col>
            </Row>
    </div>
    )
}

const pageStyle = {
    backgroundImage: 'url(/static/info/patrick-tomasso-lango.jpg)', // louis-pellissier-unsplash.jpg
    top: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundSize: 'cover',
    overflow: 'auto'
} as React.CSSProperties

const rowStyle = {
    left: 0, display: 'flex', alignItems: 'center', zIndex: 1, marginBottom: '100px'
} as React.CSSProperties

const colStyle = {
    width: 800, maxWidth: '90%', marginRight: 'auto', marginLeft: 'auto', padding: 30,
    border: '1px', borderRadius: '4px', backgroundColor: 'white',
    marginTop: 100, zIndex: 1, textAlign: 'left'
} as React.CSSProperties


