//hanb.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/store/books/new_book_list.html


//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다.   axios 라이브러리 불러오기(설치)
const cheerio=require('cheerio');                       // DOM라이브러리 불러오기 (설치)
const fs=require('fs');                              // 파일시스템 관련 라이브러리 fs
const path=require('path');                // 파일경로(알트 엔터) 관련 라이브러리  path  경로해서 다운안받아도 fs 와 path는 이미 있는 라이브러리


async function main() {        //비동기 I/O 지원 함수 정의 async
    //접속할 url지정
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';

    //수집한 개별정보를 저장하기 위해 배열 선언
    let titles=[], writers=[] , prices=[];
    let books=[];

    //axios로 접속해서 html을 불러옴
    const html = await axios.get(URL, {
        headers : {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}
    });   //서버 요청시 User-Agent 헤더 사용  -

    //불러온 html을 parsing해서 dom 생성         --해당 html의 소스코드(data)를 dom에 생성(load)
    const dom = cheerio.load(html.data);
    //console.log(dom);

    // CSS 선택자로 도서 제목을 담고 있는 요소 지정
    let elements = dom('.book_tit');          // . 으로 선택자 지정

    //찾은 요소를 순회하면서 요소의 텍스트 출력           each 찾아라  elements(bookt_tit)클라스 요소(title)의 소스(idx)를 - 찾으면 아래 실행
    elements.each((idx,title)=>{
        //console.log(dom(title).text());                      // 콘솔 로그에 요소 (title)를 text()로 출력하라
        titles.push(dom(title).text());           //배열에 추가

    });

    //CSS선택자로 저자를 담고 있는 요소 지정
    let elements1 = dom('.book_writer');
    elements1.each((idx,writer)=>{
        //console.log(dom(writer).text());
        writers.push(dom(writer).text());

    });


    //CSS선택자로 가격을 담고 있는 요소 지정
    let elements2 = dom('.price');
    elements2.each((idx,price)=>{
        //console.log(dom(price).text());
        prices.push(dom(price).text());
    });

    //저장된 배열 요소 갯수 확인
    console.log(titles.length,writers.length,prices.length);

    //수집한 정보들을 json객체로 생성
    for(let i = 0; i < titles.length; ++i){                  //books는 배열 복수 , book은 단수 하나의 객체로 만들자!
        let book= {};
        book.title=titles[i];
        book.writer=writers[i].replace(/ /g,'');
        book.price=prices[i].replace(/[,|원]/g,'');
        books.push(book);

    }
    //생성된 도서 객체 확인
    console.log(books);

    //생성된 도서 객체를 json객체로 변환하기
    const bookJSON = JSON.stringify(books);

    //파일에 저장
    !fs.existsSync('data') && fs.mkdirSync('data'); //디렉토리 생성 여부 확인

    //저장위치와 파일명 지정 후 파일에 저장
    const fpath = path.join(__dirname,'data','books.json');  //경로 __dirname 는 지금 스크립트를 쓰는 이곳 경로를 말함 그뒤 data 폴더에 books.json 생성
    fs.writeFileSync(fpath,bookJSON);
}


main();