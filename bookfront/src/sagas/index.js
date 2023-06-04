import {all,fork,call,take,put, takeEvery, takeLatest, delay} from 'redux-saga/effects'
import { SEARCH_BOOK_FAIL, SEARCH_BOOK_REQUEST, SEARCH_BOOK_SUCCESS } from '../reducer'

import axios from 'axios';

function searchBookAPI(data){
    // return axios.post('/post',data,{
    //     withCredentials:true
    // })

    const url=`/v1/search/book.json?query=${data}&sort=date`
    const clientId = "NqCz0y0licjXZjQJ46Wu";
    const clientSecret = "1QsSIEHHYS";
    
    return axios.get(url
        ,{
         headers:{
           Accept: "application/json",
           "X-Naver-Client-Id": clientId,
           "X-Naver-Client-Secret": clientSecret,
         }
       })
}



function* searchBook(action){

    try{
        // const id=shortid.generate()
        // yield delay(1000)
        // console.log(action.data,'asdsadsa')
        const result =yield call(searchBookAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:SEARCH_BOOK_SUCCESS,
            data:result.data.items
        })
    
        
    }catch(err){
        // yield put({
        //     type: SEARCH_BOOK_FAIL,
        //     data:err.response.data,
        // })
        console.log(err)
    }
    
}


function* watchSearchBook() {
    yield takeLatest(SEARCH_BOOK_REQUEST, searchBook);
  }
  


export default function* rootSaga(){
 
    
    yield all([
      

        fork(watchSearchBook),
    ])

}