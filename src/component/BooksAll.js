import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';

const {Meta} = Card;

class BooksAll extends Component {
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>

                </Row>
            </div>
        )
    }
}

export default BooksAll;