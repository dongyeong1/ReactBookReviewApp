import React from 'react'
import {Image} from 'antd'

const ImageCard = ({searchedBook}) => {
  return (
    <div>
        <Image
            width={200}
            src={searchedBook.image}
        ></Image>

        {searchedBook.title}
    </div>
  )
}

export default ImageCard