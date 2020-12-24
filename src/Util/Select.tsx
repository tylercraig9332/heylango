import React, { useEffect, useState } from 'react'
import { Select, Input } from 'antd'
import language from './language.json'

const { Option } = Select
const { Search } = Input

type SelectProps = {
    value? : string | string[],
    onChange : any,
    type? : string,
    placeholder?: string,
    style?: React.CSSProperties,
    removeAny?: boolean
}

export function CEFRSelect(props : SelectProps) {
    return (
        <div style={props.style}>
        <Select
            mode="default"
            onChange={props.onChange}
            style={{width: '100%', minWidth: 300}}
            placeholder={(props.placeholder === undefined) ? "Select Difficulty" : props.placeholder}
            value={props.value}
        >
            {
                language.CEFR.map((d : any) => {
                    return (
                        <Option value={d.name} key={d.name}>
                            {d.name} | {d.description}
                        </Option>
                    )
                })
            }
        </Select>
        </div>
    )
}

export function LanguageSelect(props : SelectProps) {
    return (
        <div style={props.style}>
        <Select
            mode="default"
            onChange={props.onChange}
            style={{width: '100%', minWidth: 200}}
            placeholder={(props.placeholder === undefined) ? "Select Language" : props.placeholder}
            value={props.value}
        >
            {
                language.info.map(language => {
                    return (
                        <Option value={language.code} key={language.code} disabled={(props.removeAny && language.code === 'all')}>
                            {language.title} 
                            <span role="img"> {language.flag}</span>
                        </Option>
                    )
                })
            }
        </Select>
        </div>
    )
}

export function CategorySelect(props : SelectProps) {

    const [catOption, setOptions] = useState<Array<Object>>([])
    
    useEffect(() => {
        _initOptions().then(opts => {
            setOptions(opts)
        })
    }, [])

    async function _initOptions() {
        const ytCat : {[key: string] : any} = language.youtubeCategories
        const processArray = async () => {
            let categoryArray = []
            for (const category in ytCat) {
                categoryArray.push({value: category, title: ytCat[category]})
            }
            return categoryArray
        }
        return await processArray()
    }

    if (catOption.length === 0) return null
    return (
        <div style={props.style}>
        <Select
            mode="default"
            onChange={props.onChange}
            style={{width: '100%', minWidth: 200}}
            placeholder={(props.placeholder === undefined) ? "Select Category" : props.placeholder}
            value={props.value}
        >
            {
                catOption.map((opt : any) => {
                    return (
                        <Option value={opt.value} key={opt.value}>
                            {opt.title} 
                        </Option>
                    )
                })
            }
        </Select>
        </div>
    )
}

export function SearchBar(props : SelectProps) {
    return (
        <div style={props.style}>
            <Search
                disabled
                placeholder={props.placeholder}
                onSearch={props.onChange}
                style={{ minWidth: 200 }}
            />
        </div>
    )
}

export function MultiLanguageSelect(props : SelectProps) {
    return (
        <Select
            mode="multiple"
            onChange={props.onChange}
            style={{width: '100%', minWidth: 200}}
            placeholder={(props.placeholder === undefined) ? "Select Language(s)" : props.placeholder}
            value={props.value}
        >
             {
                language.info.map(language => {
                    return (
                        <Option value={language.code} key={language.code}>
                            {language.title} 
                            <span role="img"> {language.flag}</span>
                        </Option>
                    )
                })
            }
        </Select>

    )
}