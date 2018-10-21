import React from 'react'
import { Card, Button, Modal } from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjsToHtml from 'draftjs-to-html'
import './index.less'

export default class Richtext extends React.Component {
    state = {
        visible: false,
        editorState: EditorState.createEmpty()
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    handleGetHTML = () => {
        this.setState({
            visible: true
        })
    }
    handleClear = () => {
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }
    render() {
        const { editorState } = this.state
        return (
            <div>
                <Card className="card-wrap">
                    <Button
                        type="primary"
                        onClick={this.handleGetHTML}
                    >获取HTML文本</Button>
                    <Button onClick={this.handleClear}>清空内容</Button>
                    <div style={{ marginTop: 10 }}>
                        <Editor
                            editorState={editorState}
                            editorClassName="editorContainer"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                </Card>
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => this.setState({
                        visible: false
                    })}
                >
                    {draftjsToHtml(convertToRaw(editorState.getCurrentContent()))}
                </Modal>
            </div>
        )
    }
}
