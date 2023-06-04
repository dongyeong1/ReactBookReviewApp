import {produce} from 'immer';
import shortId from 'shortid'
 const initState = {
    num: "",
    content: "dong",
    books:[],
    posts:[],
    searchbookLoading:false,
    searchbookSuccess:false,
    seacchbookError:null,
};





const dummyPost = (data) => ({
    id: shortId.generate(),
      content: data.text,
      isbn:data.isbn,
  User: {
    id: 1,
    nickname: '김동영',
  },
  Images: [],
  Comments: [],
});

//액션
export const ADD_BOOK = "ADD_BOOK";

export const LOAD_BOOK='LOAD_BOOK'

export const ADD_POST='ADD_POST'

export const SEARCH_BOOK_REQUEST='SEARCH_BOOK_REQUEST'
export const SEARCH_BOOK_SUCCESS='SEARCH_BOOK_SUCCESS'
export const SEARCH_BOOK_FAIL='SEARCH_BOOK_FAIL'



const rootReducer=(state=initState,action)=>produce(state,(draft)=>{
        switch(action.type){
            case ADD_BOOK:
                draft.books=action.data
                break;
            case LOAD_BOOK:
                draft.books=draft.books.find((v)=>v.isbn===action.data)
                // const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                break;
            case ADD_POST:
                draft.posts.unshift(dummyPost(action.data)) 
                break;
            case SEARCH_BOOK_REQUEST:
                draft.searchbookLoading=true;
                draft.searchbookSuccess=false;
                break;
            case SEARCH_BOOK_SUCCESS:
                draft.searchbookLoading=false;
                draft.searchbookSuccess=true;
                draft.books=action.data
                break;
            case SEARCH_BOOK_FAIL:
                draft.seacchbookError='err'
                break;

            default:
                break;
        }
    })
    

   


export default rootReducer;