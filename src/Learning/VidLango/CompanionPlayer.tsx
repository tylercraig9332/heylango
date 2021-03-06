import React from 'react'

type VPProps = {
    video_id : string,
    visible? : boolean,
    autoplay?: boolean
}

export default function VideoPlayer(props : VPProps) {

    if (!props.visible) return null
    return (
        <div
            className="video"
            style={{
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0
            }}>
                <iframe
                    style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                    }}
                    src={`https://www.youtube.com/embed/${props.video_id}?autoplay=${props.autoplay ? 1 : 0}&enablejsapi=1`}
                    frameBorder="0"
                />
            </div>
    )
}
