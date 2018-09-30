import React from 'react'
import { Form, Input, Button, Card, Icon, Checkbox } from 'antd'
import './form.less'

const FormItem = Form.Item

class LoginForm extends React.Component {
    // componentDidMount() {
    //     this.props.form.validateFields()
    // }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    }

    handleInlineSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, value) => {
            if(!err) {
                console.log(`Received values of from: `, value)
            }
        })
    }

    render() {
        const {
            getFieldDecorator,
            getFieldsError
        } = this.props.form

        const userNameRules = [{
            required: true,
            message: 'please input your userName!'
        }, {
            min: 5,
            max: 10,
            message: 'check userName\'s length: 5 - 10'
        }, {
            pattern: new RegExp('^\\w+$', 'g'),
            message: 'Username must contain letters or numbers'
        }]

        const passwordRules = [{
            required: true, message: 'please input your password!'
        }]

        return (
            <div>
                <Card title="行内登录">
                    <Form layout="inline" onSubmit={this.handleInlineSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                               rules: userNameRules
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="UserName" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: passwordRules
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="PassWord" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={this.hasErrors(getFieldsError())}
                            >Log in</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="水平登录" style={{marginTop:10}}>
                    <Form className="login-form" onSubmit={this.handleInlineSubmit}>
                        <FormItem>
                            {getFieldDecorator('userName1', {
                                rules: userNameRules
                            })(
                                <Input placeholder="UserName" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password1', {
                                rules: passwordRules
                            })(
                                <Input placeholder="PassWord" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

const WrappedMyForm = Form.create()(LoginForm)

export default WrappedMyForm