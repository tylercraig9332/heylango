interface WordLearnerProps {
    value?: string,
    onChange?: any,
    readOnly?: boolean,
    style?: React.CSSProperties,
    wordsPerPage?: number,
    fontSize?: string,
    lineHeight?: string,
    simplified?: boolean /** Displays less content for more general purpose */
}

export default WordLearnerProps