//미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
//https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
//?serviceKey=SMqEHcgO3gEigZ%2BqpaX4S%2FRSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU%2BIgBODJBXHBLU37OFBYYfsDg%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0



//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다. require은  axios 라이브러리 불러오기(설치)
const cheerio=require('cheerio');                       // DOM라이브러리 불러오기 (설치)   - 검색 라이브러리
const path=require('path');                       // DOM라이브러리 불러오기 (설치)   - 검색 라이브러리
const fs=require('fs');                       // DOM라이브러리 불러오기 (설치)   - 검색 라이브러리


const {XMLParser} = require('fast-xml-parser'); //xml 처리기 라이브러리

//인증 vs 인가 의 차이를 구분할 수 있어야한다.

async function main() {        //비동기 I/O 지원 함수 정의 async
    //접속할 url지정
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'; //1.접속 주소 가져오기
    const params={'serviceKey': 'SMqEHcgO3gEigZ+qpaX4S/RSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU+IgBODJBXHBLU37OFBYYfsDg==',
        'returnType':'xml','sidoName':'서울' ,'numOfRows':1000, 'ver':1.3}; //'numOfRows':500             -- serviceKey 서비스 이용시 권한
    const headers ={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};




    //axios로 접속해서 대기오염 정보를 받아옴
    const xml = await axios.get(URL, {
        params:params,headers:headers                   //url  파라메타 등

    });


    //받아온 데이터 확인
    //console.log(xml.data)
    
    //XML을 json으로 변환하기   
    const parser =new XMLParser();            //XMLParser 를 이용해서
    let json =parser.parse(xml.data);         // xml데이터를 json으로 변환




    let items=json['response']['body']['items'];
    //console.log(items['item']);

    //미세먼지 정보 출력

    for (let item of items['item']){
        console.log(item.sidoName,
            item.stationName,
            item.pm10Value,
            item.pm25Value,item.dataTime,pmGrade(item.pm10Grade),pmGrade(item.pm25Grade),item.dataTime);   //키명
    }


 }


let pmGrade = (val)=>{
    let emojis = ['😍','😐','😨','😱'];

    return emojis[parseInt(val)-1];
};

main();