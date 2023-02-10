//hanb.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html


//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');
const {Axios} = require("axios");               //- axios 알트 엔터로 바로 설치 가능 하다.   axios 라이브러리 불러오기


const main=()=>{

    //접속할 url지정
    const URL='https://www.hanbit.co.kr/store/books/new_book_list.html';

    //axios로 접속해서 html을 불러옴
    axios.get(URL)
    .then((html)=>{
        //불러온 html을 콘솔에 출력
        console.log(html.data);
    })
        .catch((error)=>{
            console.log(error)
        });

};                                    /*이렇게 하면 한빛 미디어 홈페이지의 소스를 그대로 가져와서 볼수있다.*/
main();                                  /*브라우저안이 아닌 콘솔 안에서 하는 것이기 때문에  */
