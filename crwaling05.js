//코로나 19 시도 별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력
//view-source:https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
//?serviceKey=SMqEHcgO3gEigZ%2BqpaX4S%2FRSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU%2BIgBODJBXHBLU37OFBYYfsDg%3D%3D&pageNo=1&numOfRows=500&apiType=json&std_day=2023-02-13&gubun=%EC%84%9C%EC%9A%B8


//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다. require은  axios 라이브러리 불러오기(설치)
const {XMLParser}=require('fast-xml-parser');                       // DOM라이브러리 불러오기 (설치)




async function main() {        //비동기 I/O 지원 함수 정의 async
    //접속할 url지정
    //apiType:xml 또는 JSON  대소문자 주의!
    const URL = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
    const params={'serviceKey':
            'SMqEHcgO3gEigZ+qpaX4S/RSZEhArOTrEXypOX6TDZuGUnLRdkXDGGHpTb6voU+IgBODJBXHBLU37OFBYYfsDg==',
        'apiType':'xml','std_day':'2023-02-12','gubun':''}; //'numOfRows':500             -- serviceKey 서비스 이용시 권한
    const headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};

    //axios로 접속해서 xml을 불러옴
    const xml = await axios.get(URL, {
        params:params,headers:headers                   //url  파라메타 등

    });
    console.log(xml.data)

    //여기까지 본 자료만으로
    //XML을 JSON으로 변환하기
    const parser = new XMLParser();
    let json = parser.parse(xml.data);
    //console.log(json);

    //JSON으로 불러오기
    let items= json['response']['body']['items']['item'];
    //console.log(items);

    //지역별
    for (let item of items){
        console.log(`지역 :${item.gubun}, 
        전일확진자수: ${item.incDec},
        총 확진자 수 :${item.defCnt},
         사망자 수 : ${item.deathCnt},
          측정일 : ${item.stdDay}`);
    }
}


main();