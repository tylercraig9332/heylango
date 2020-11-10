import React, { useEffect, useState } from 'react'
import WordLearner from '../../../../Draft/WordLearner/WordLearner'

export default function SubtitleViewer(props : {captions : Array<any>, currentTime: number}) {
    const [texts, setTexts] = useState<Array<string>>(['', ''])


    function captionTimeToSeconds(stringTime : string) : number {
        const times = stringTime.split(':')
        const m_s = times[2].split(',')
        // milliseconds
        const ms = parseInt(m_s[1])
        // seconds
        const s = parseInt(m_s[0])
        // minutes
        const m = parseInt(times[1])
        // hours
        const h = parseInt(times[0])
        // Totoal seconds of the time string
        const seconds = (h * 60 * 60) + (m * 60) + s + (ms / 1000)
        return seconds

    }

    useEffect(() => {
        if (props.captions === undefined || props.captions.length < 1) return
        // Dispays in seconds
        //console.log(props.currentTime)
        //console.log(props.captions)
        props.captions.forEach((captionSet, i) => {
            captionSet.captions.forEach((caption : any) => {
                if (props.currentTime > captionTimeToSeconds(caption.start) && props.currentTime < captionTimeToSeconds(caption.end)) {
                    let t = texts
                    t[i] = caption.content
                    setTexts(t)
                }
            })
        })
    }, [props.currentTime])

    if (props.captions === undefined || props.captions.length === 0) {
        return <div>No Captions Provided</div>
    }
    return (
        <div>
            {
                texts.map((text, i) => {
                    return (
                        <div key={text + i} style={{marginBottom: '20px'}}><WordLearner value={text} lineHeight={'40px'} fontSize={'24px'} simplified readOnly/></div>
                    )
                })
            }
        </div>
    )
}