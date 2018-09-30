import React from 'react'
import moment from 'moment'
import {
    Form, Button, Input, DatePicker, Icon, Upload, message,
    Radio, Select, Switch, Checkbox, Card, InputNumber, TimePicker
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

class RegForm extends React.Component {
    state = {
        avatarSrc: '',
        avatarLoading: false,
        agreed: false
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    /**
     * 头像上传之前验证文件上传类型与大小
     */
    beforeAvatarUpload = (file) => {
        const isPng = file.type === 'image/png'
        if(!isPng) {
            message.error('You can only upload png file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if(!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isPng && isLt2M
    }

    handleAvatarChange = (info) => {
        const { file } = info
        if(file.status === 'uploading') {
            this.setState({
                avatarLoading: true
            })
        } else if (file.status === 'done') {
            this.getBase64(file.originFileObj, avatarSrc => this.setState({
                avatarSrc,
                avatarLoading: false
            }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, value) => {
            if(!err) {
                console.log(value);
            }
        })
    }

    handleChangeAgreed = (e) => {
        this.setState({
            agreed: e.target.checked
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetFormItemLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const dateFormat = 'YYYY/MM/DD'
        const avatarSrc = this.state.avatarSrc

        return (
            <div>
                <Card title="注册表单">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true,
                                    message: '请输入用户名'
                                }]
                            })(
                                <Input placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '请输入密码'
                                }]
                            })(
                                <Input type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别">
                            {getFieldDecorator('sex', {
                                initialValue: '1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="0">女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: 18
                            })(
                                <InputNumber />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="当前状态">
                            {getFieldDecorator('currentState', {
                                initialValue: '2'
                            })(
                                <Select>
                                    <Option value="1">百度FEr</Option>
                                    <Option value="2">阿里国际UED</Option>
                                    <Option value="3">创业者</Option>
                                    <Option value="4">搬砖</Option>
                                    <Option value="5">浪子</Option>
                                    <Option value="6">清华才子</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="爱好">
                            {getFieldDecorator('hobby', {
                                initialValue: ['3', '5', '8']
                            })(
                                <Select mode="multiple" placeholder="请选择爱好">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">骑行</Option>
                                    <Option value="7">桌球</Option>
                                    <Option value="8">麦霸</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否已婚">
                            {getFieldDecorator('isMarried', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Switch />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="生日">
                            {getFieldDecorator('birthday', {
                                initialValue: moment('2000-01-01', dateFormat)
                            })(
                                <DatePicker format={dateFormat} placeholder="出生日期" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系地址">
                            {getFieldDecorator('addr', {
                                initialValue: '北京市海淀区奥林匹克公园'
                            })(
                                <TextArea autosize={{ minRows: 2, maxRows: 5 }} placeholder="联系地址" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="早起时间">
                            {getFieldDecorator('getUpTime', {
                                initialValue: moment('07:00:00', 'HH:mm:ss')
                            })(
                                <TimePicker placeholder="早起时间" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="头像">
                            {getFieldDecorator('avatar')(
                                <Upload
                                    accept="image/png"
                                    listType="picture-card"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={this.beforeAvatarUpload}
                                    onChange={this.handleAvatarChange}
                                    showUploadList={false}
                                >
                                    {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <Icon type={this.state.avatarLoading ? 'loading' : 'plus'} />}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem {...offsetFormItemLayout}>
                            {getFieldDecorator('isAgree')(
                                <Checkbox onChange={this.handleChangeAgreed}>我已阅读过<a>慕课协议</a></Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...offsetFormItemLayout}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!this.state.agreed}
                            >
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(RegForm)