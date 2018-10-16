import React from 'react'
import { Select, Input, DatePicker, Form, Button } from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

class FilterForm extends React.Component {

    handleSearch = () => {
        const fieldsValue = this.props.form.getFieldsValue()
        this.props.handleFilterSearch(fieldsValue)
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    /**
     * 获取Select的Option列表
     */
    getOptions = (optionList = []) => {
        return optionList.map(option => (<Option value={option.value}>
            {option.text}
        </Option>))   
    }

    initFormItems = () => {
        const { formList } = this.props
        const { getFieldDecorator } = this.props.form
        if (formList && formList.length > 0) {
            return formList.map(formItem => {
                const { type, label, fieldName, initialValue = '', placeholder, width } = formItem
                switch(type) {
                    case 'INPUT':
                        return (<FormItem label={label}>
                            {getFieldDecorator(fieldName, {
                                initialValue
                            })(
                                <Input placeholder={placeholder} style={{ width }} />
                            )}
                        </FormItem>)
                    case 'SELECT':
                        const { optionList } = formItem
                        return (<FormItem label={label}>
                            {getFieldDecorator(fieldName, {
                                initialValue
                            })(
                                <Select placeholder={placeholder} style={{ width }}>
                                    {this.getOptions(optionList)}
                                </Select>
                            )}
                        </FormItem>)
                    case 'RANGEPICKER':
                        return (<FormItem label={label}>
                            {getFieldDecorator(fieldName, {
                                initialValue
                            })(
                                <RangePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={placeholder}
                                />
                            )}
                        </FormItem>)
                        default:
                }
            })
        }
        return []
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormItems()}
                <FormItem>
                    <Button type="primary" onClick={this.handleSearch}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FilterForm)