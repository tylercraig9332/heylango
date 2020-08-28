import React, { useState, useEffect } from 'react'
import Expression from './Expression'
import { message, Table, Button, Modal, Icon, Input, Popconfirm, Tooltip } from 'antd'
import {parseLanguageCode} from '../../Util/functions'
import DeckModal from './DeckModal'

export default function List() {

    const [expressions, setExpressions] = useState<Expression[]>([])
    const [editModal, setEditModal] = useState<boolean>(false)
    const [expressRefresh, setExpressRefresh] = useState<boolean>(true)

    const [editExpression, setEditExpression] = useState<any>()
    const [editValue, setEditValue] = useState<string>('')
    const [editTranslation, setEditTranslation] = useState<string>('')
    const [editLanguage, setEditLanguage] = useState<string>('')
    const [edit_id, setEdit_id] = useState<string>('')

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [deckModalView, setDeckModalView] = useState<boolean>(false)


    useEffect(() => {
        if (expressRefresh === false) return
        const reqHeaders = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        fetch('/s/ex/', reqHeaders).then(res => {
            if (res.status !== 200) message.error(res.statusText) 
            return res.json()
        }).then(exp => {
            const tableData = exp.map((exp : Expression , i : number) => {
                    return {
                        key: exp._id,
                        expression: exp.value,
                        translation: exp.translation,
                        language: parseLanguageCode(exp.language)
                    }
                })
            setExpressions(tableData)
            setExpressRefresh(false)
        })
    }, [expressRefresh])

    const actionComponent = (expression : any) => {
        return (
            <Tooltip title="Edit">
                <Button onClick={() => {
                    console.log(expression)
                    setEditModal(true)
                    setEditValue(expression.expression)
                    setEditLanguage(expression.language)
                    setEditTranslation(expression.translation)
                    setEdit_id(expression.key)     
                }}><Icon type="edit" /></Button>
            </Tooltip>

    )}

    const tableHeaders = [
        {
            title: 'Word / Expression',
            dataIndex: 'expression',
            key: 'expression'
        },
        {
            title: 'Meaning / Translation',
            dataIndex: 'translation',
            key: 'translation'
        },
        {
            dataIndex: '',
            title: 'Edit',
            key: 'edit',
            width: '20px',
            render: (t : any) =>  <div>{actionComponent(t)}</div>
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language'
        }
    ]

    function saveWord() {
        // TODO: save edits made
        const reqHeader = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: editValue,
                translation: editTranslation
            })
        }
        fetch('/s/ex/' + edit_id, reqHeader).then(r => {
            if (r.status === 200) message.success('Saved!')
            else if (r.status === 400) message.error('An error has occurred')
            setEditModal(false)
            setEditValue('')
            setEditLanguage('')
            setEditTranslation('')
            setEdit_id('')
            setExpressRefresh(true)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function deleteWord() {
        const reqHeader = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: edit_id
            })
        }
        fetch('/s/ex/' + edit_id, reqHeader).then(r => {
            if (r.status === 200) message.success('Deleted')
            else if (r.status === 400) message.error('An error has occurred')
            setEditModal(false)
            setEditValue('')
            setEditLanguage('')
            setEditTranslation('')
            setEdit_id('')
            setExpressRefresh(true)
        })
    }

    function onSelectChange(srq : any) {
        //console.log(srq)
        setSelectedRowKeys(srq)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    

    return (
        <div>
            <div style={{display: 'flex', marginBottom: '10px'}}>
                <Button onClick={() => setDeckModalView(true)}>Add Selected to Flashcard Deck</Button>
            </div>
           
            <Table dataSource={expressions} columns={tableHeaders} rowSelection={rowSelection} bordered/>
            <div style={{display: 'flex', marginTop: '-50px'}}>
                <Button onClick={() => setDeckModalView(true)}>Add Selected to Flashcard Deck</Button>
            </div>
            <Modal title="Edit Word / Expression" visible={editModal} onOk={() => saveWord()} onCancel={() => setEditModal(false)} okText={'Save'}>
                <div style={{color: 'spacegray'}}>Word or Phrase</div>
                <Input key={'value'} value={editValue} onChange={(e : any) => {setEditValue(e.currentTarget.value)}} />
                <div style={{color: 'spacegray', marginTop: '10px'}}>Translation</div>
                <Input key={'translation'} value={editTranslation} onChange={(e : any) => setEditTranslation(e.currentTarget.value)} />
                <div style={{color: 'spacegray', marginTop: '10px'}}>Action</div>
                <Popconfirm
                    title="Are you sure you want to delete this word / phrase?"
                    onConfirm={deleteWord}
                    okText='Delete'
                >
                    <Button type="danger" >Delete Word / Phrase</Button>
                </Popconfirm>
            </Modal>
            <DeckModal 
                visible={deckModalView} 
                onCancel={() => setDeckModalView(false)} 
                selected={selectedRowKeys} 
                onOk={() => {
                    setDeckModalView(false)
                    setSelectedRowKeys([])
                }}

            />
        </div>
    )
}