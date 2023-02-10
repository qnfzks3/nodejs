//hanb.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html


//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다.   axios 라이브러리 불러오기(설치)
const cheerio=require('cheerio');                       // DOM라이브러리 불러오기 (설치)


async function main() {        //비동기 I/O 지원 함수 정의 async

    //접속할 url지정
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

    //axios로 접속해서 html을 불러옴
    const html = await axios.get(URL);   //비동기 I/O 지원

    //불러온 html을 parsing해서 dom 생성         --해당 html의 소스코드(data)를 dom에 생성(load)
    const dom = cheerio.load(html.data);
    //console.log(dom);

    // CSS 선택자로 도서 제목을 담고 있는 요소 지정
    let elements = dom('.book_tit');          // . 으로 선택자 지정

    //찾은 요소를 순회하면서 요소의 텍스트 출력           each 찾아라  elements(bookt_tit)클라스 요소(title)의 소스(idx)를 - 찾으면 아래 실행
    elements.each((idx,title)=>{
        console.log(dom(title).text());                      // 콘솔 로그에 요소 (title)를 text()로 출력하라
    });

    //CSS선택자로 저자를 담고 있는 요소 지정
    let elements1 = dom('.book_writer');
    elements1.each((idx,writer)=>{
        console.log(dom(writer).text());
    });


    //CSS선택자로 가격을 담고 있는 요소 지정
    let elements2 = dom('.price');
    elements1.each((idx,price)=>{
        console.log(dom(price).text());
    });

};


main();