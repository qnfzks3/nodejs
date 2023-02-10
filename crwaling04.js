//미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
//https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
//?serviceKey=SMqEHcgO3gEigZ%2BqpaX4S%2FRSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU%2BIgBODJBXHBLU37OFBYYfsDg%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0



//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다. require은  axios 라이브러리 불러오기(설치)
const cheerio=require('cheerio');                       // DOM라이브러리 불러오기 (설치)   - 검색 라이브러리



async function main() {        //비동기 I/O 지원 함수 정의 async
    //접속할 url지정
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params={'serviceKey': 'SMqEHcgO3gEigZ+qpaX4S/RSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU+IgBODJBXHBLU37OFBYYfsDg==','returnType':'json','sidoName':'전국'
    ,'numOfRows':500}; //'numOfRows':500
    const headers ={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};



    //axios로 접속해서 대기오염 정보를 받아옴
    const json = await axios.get(URL, {
        params:params,headers:headers

    });

    //console.log(json.data)

    let items=json.data['response']['body']['items'];
    //console.log(items);

    //미세먼지 정보 출력
    //pm25Value 는 출력 안됨!

    for (let item of items){
        console.log(item.sidoName,item.stationName,item.pm10Value,item.pm25Value,item.dataTime);   //키명
    }
}


main();