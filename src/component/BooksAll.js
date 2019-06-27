import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../config.json'
import history from '../common/history'

const { Meta } = Card;

class BooksAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        axios.get(api + "/api/findAll")
            .then(response => {
                console.log(response.data);
                this.setState({
                    books: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div  style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    {this.state.books.map((item, index) => {
                        return (
                            <Col key={item.bookId} span={6}>
                                <Card
                                    hoverable
                                    cover={<img alt="example" src={item.pic ? item.pic : "statics/empty.jpg"} height="260px" width="100px" />}
                                >
                                    <Meta title={item.bookName}
                                        description={"￥" + item.priceOri}
                                        style={{ textAlign: "center" }}
                                        onClick={() => {
                                            console.log(item.bookId)
                                            history.push({ pathname: '/bookshow', state: { bookid: item.bookId } })
                                        }}
                                    />
                                </Card>
                                <hr />
                            </Col>
                        )
                    })
                    }
                </Row>
            </div>
        )
    }
}

export default BooksAll;