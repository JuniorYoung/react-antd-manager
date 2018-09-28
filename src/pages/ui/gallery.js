import React from 'react'
import { Card, Row, Col, Modal } from 'antd'

export default class Gallery extends React.Component {
    state = {
        visible: false,
        img: ''
    }

    handleClick = (img) => {
        this.setState({
            visible: true,
            img: '/gallery/' + img
        })
    }
    
    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ]

        const imgNodes = imgs.map(colImgs => colImgs.map(img => (
            <Card
                style={{marginBottom: 10}}
                cover={<img src={`/gallery/${img}`} alt={img} />}
                onClick={() => this.handleClick(img)}
            >
                <Card.Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                />
            </Card>
        )))

        return (
            <div>
                <Row gutter={10}>
                    <Col md={5}>
                        {imgNodes[0]}
                    </Col>
                    <Col md={5}>
                        {imgNodes[1]}
                    </Col>
                    <Col md={5}>
                        {imgNodes[2]}
                    </Col>
                    <Col md={5}>
                        {imgNodes[3]}
                    </Col>
                    <Col md={4}>
                        {imgNodes[4]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    footer={null}
                    title="gallery"
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    {<img src={this.state.img} alt={this.state.img} width='100%' />}
                </Modal>
            </div>
        )
    }
}