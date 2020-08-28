interface Lango {
    _id: string,
    content: string,
    title: string,
    description: string,
    language: string,
    author: string,
    alternateContent?: string
    audio?: any,
    video_id?: string,
    imageSrc? : string,
    difficulty?: string
}

export default Lango