import React, { useEffect } from 'react'
import {Button, Card} from 'antd'

const BookImageSelect = ({showModal,searchedBook}) => {

  return (
  <div>
  {searchedBook?
    <Card
    hoverable
    style={{
      marginTop:30,
      width: 350,
      height:510
    }}
    cover={<img alt="example" height='400' src={searchedBook.image} />}
    >
    <Card.Meta title={searchedBook.title}
      description={ <Button type='primary' size='large' style={{borderRadius:30,marginLeft:80}} onClick={showModal}> 다른책 검색하기</Button>}
    ></Card.Meta>
    </Card>:<Card
      hoverable
      style={{
        marginTop:30,

        width: 350,
        height:510
      }}
      
      >
    <div style={{textAlign:'center'}}>
    <Button type='primary' size='large' style={{borderRadius:30,marginTop:200}} onClick={showModal}>책 검색하기</Button>
    </div>
    </Card>}
    </div>
  )
}

export default BookImageSelect