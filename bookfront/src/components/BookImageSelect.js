import React, { useEffect } from 'react'
import {Card,Empty} from 'antd'
import {FileSearchOutlined} from '@ant-design/icons'

const BookImageSelect = ({showModal,searchedBook}) => {

  useEffect(()=>{
    console.log(searchedBook)
  },[])
  return (
  <div>
  {searchedBook?
  <Card
  onClick={showModal}
  hoverable
  style={{
    width: 200,
    height:200
  }}
  cover={<img alt="example" height='150' src={searchedBook.image} />}
  >
  +다른책 검색하기
  <Card.Meta title={searchedBook.title} ></Card.Meta>
  </Card>:<Card
    onClick={showModal}
    hoverable
    style={{
      width: 200,
      height:200
    }}
    cover={<FileSearchOutlined style={{ fontSize: '100px', color: '#08c',justifyContent:'center' }} />}
    >
    +책 검색하기
    </Card>}
    </div>
  )
}

export default BookImageSelect