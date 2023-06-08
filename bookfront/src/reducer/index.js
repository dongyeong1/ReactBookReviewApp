import {produce} from 'immer';
import shortId from 'shortid'
 const initState = {
    books:[],
    posts:[],
    user:null,
    searchbookLoading:false,
    searchbookSuccess:false,
    seachbookError:null,
    signupLoading:false,
    signupSuccess:false,
    signupError:null,
    loginLoading:false,
    loginSuccess:false,
    loginError:null,
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

export const SEARCH_BOOK_REMOVE='SEARCH_BOOK_REMOVE'

export const SIGNUP_REQUEST='SIGNUP_REQUEST'
export const SIGNUP_SUCCESS='SIGNUP_SUCCESS'
export const SIGNUP_FAIL='SIGNUP_FAIL'

export const LOGIN_REQUEST='LOGIN_REQUEST'
export const LOGIN_SUCCESS='LOGIN_SUCCESS'
export const LOGIN_FAIL='LOGIN_FAIL'



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
                draft.seachbookError='err'
                break;
            case SIGNUP_REQUEST:
                draft.signupLoading=true;
                draft.signupSuccess=false;
                break;
            case SIGNUP_SUCCESS:
                draft.signupLoading=false;
                draft.signupSuccess=true;
                break;
            case SIGNUP_FAIL:
                draft.signupError='err'
                break;
            case LOGIN_REQUEST:
                draft.loginLoading=true;
                draft.loginSuccess=false;
                break;
            case LOGIN_SUCCESS:
                draft.loginLoading=false;
                draft.loginSuccess=true;
                draft.user=action.data
                break;
            case LOGIN_FAIL:
                draft.loginError='err'
                break;            
            case SEARCH_BOOK_REMOVE:
                draft.books=[]
            default:
                break;
        }
    })
    

   


export default rootReducer;