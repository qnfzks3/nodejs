//hanb.co.kr 사이트에서 '새로나온 책'에 대한 정보를 긁어오기
//https://www.hanbit.co.kr/



/*create table newbooks(
    bookno number(6),
    title varchar(250) not null,
    writer varchar(250) not null,
    price number not null,
    regdate date default sysdate,
    primary key (bookno)

);
create sequence  bkno;
select bkno.currval from dual;*/                      // 순번 생성기




const axios=require('axios');
const cheerio=require('cheerio')
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js')
const fs = require("fs");
const path = require("path");


async function main(){
    // 지정한 사이트로부터 도서제목, 저자, 가격을 추출해서 
    //JSON 객체로 저장
    const URL = 'https://www.hanbit.co.kr/store/books/new_book_list.html';
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'}

    //수집한 개별정보를 저장하기 위해 배열 선언 -전개(SPREAD) 연산자 -  배열을 담아두는 연산자
    let [titles, writers,prices,books]=[[],[],[],[]];

    //axios로 접속해서 html을 불러옴
    const html = await axios.get(URL, {
        headers : headers
    });

    const dom = cheerio.load(html.data);
//------------------------------------------------------------ 여기까지가 대이터를 불러오는 부분
    
    
    let elements = dom('.book_tit');
    
    elements.each((idx,title)=>{
        titles.push(dom(title).text());
    });

    let elements1 = dom('.book_writer');
    elements1.each((idx,writer)=>{
        writers.push(dom(writer).text());
    });


    let elements2 = dom('.price');
    elements2.each((idx,price)=>{

        prices.push(dom(price).text());
    });


    console.log(titles.length,writers.length,prices.length);

    //수집한 정보들을 json객체로 생성
    for(let i = 0; i < titles.length; ++i){
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



    //추출한 JSON객체로 부터 도서제목, 저자 , 가격을 추출해서 오라클 테이블에 저장


    let conn = null;
    let sql = ' insert into newbooks (bookno, title,writer,price) values (bkno.nextval,:1,:2,:3) ';   // 오라클은 순서 생성을 이렇게 사용-데이터가 삽입될때마다 값을 1씩증가
    let params=[];                                                                                         //bookno   bkno.nextval   시퀀스 이름 .nextval


    try {
        oracledb.initOracleClient({libDir: 'c:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        for(let bk of books){
            params=[bk.title,bk.writer, bk.price];
            let result=await conn.execute(sql,params);
            await conn.commit();
            console.log(result);
        }





    } catch(ex) {
        console.error(ex);
    } finally {
        if (conn) {
            try { await conn.close(); }
            catch (ex) { console.error(ex); }
        }
    }

}
main();



