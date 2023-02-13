//movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
//https://movie.daum.net/main
//순위,영화제목, 예약률,평점
/*
selenium

웹브라우저를 이용한 작업들을 자동화할 수 있도록 특수제작된 브라우저
axios로 스크래핑할 수 없는 동적 데이터를 포함하는 웹 페이지를
원격 조작이 가능한 웹브라우저를 이용해서 처리
로그인을 해서 특정정보를 추출하거나, 반복적인 작업을 통해 정보를 추출하거나
마우스 클릭등 무인으로 프로그램을 조작해야 할 필요가 있는 경우
브라우져 자동화 프로그램인 '셀레니엄'을 이용하면 처리 가능
https://www.npmjs.com/package/selenium-webdriver
    https://www.selenium.dev/documentation/webdriver/getting_started

    */


  /*await 는 비동기에서 쓴다.>?      비동기 - 한개씩 처리 방식        */



//사용할 패키지 가져오기 require('패키지명')
const axios=require('axios');                       //- axios 알트 엔터로 바로 설치 가능 하다. require은  axios 라이브러리 불러오기(설치)
const cheerio=require('cheerio');                       // DOM라이브러리 불러오기 (설치)
const {Builder,Browser,By,Key,until}=require('selenium-webdriver');
const path=require('path');
const {elementsLocated} = require("selenium-webdriver/lib/until");

async function main() {        //비동기 I/O 지원 함수 정의 async
    //접속할 url지정
    const URL = 'https://movie.daum.net/main';

    //크롬 자동화 브라우져 객체 생성
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();
                 
    try {
        //지정한 url로 접속
        await chrome.get(URL);
        //특정 요소가 화면에 위치할 때 까지 최대5초간 기다려 줌
        await chrome.wait(until.elementLocated(By.css('.feature_home div:nth-child(3).slide_ranking .tit_item')),5000);
        //기다려  elementsLocated가 메모리 잡힐때까지

        //접속한 사이트의 htm 소스를 가져옴
        const html = await chrome.getPageSource();
        console.log(html);

        //페이지소스를 dom객체로 변환
        const dom=cheerio.load(html);

        //영화제목 추출
        let movies=dom('.feature_home div:nth-child(3).slide_ranking .tit_item');
        //영화평점 추출
        let rates=dom('.feature_home div:nth-child(3).slide_ranking .txt_num:first-child');   // txt_num으로 평점과 예매율 둘다 나타내서 child를 사용

        //영화예매율 추출
        let rsrvs=dom('.feature_home div:nth-child(3).slide_ranking .txt_num:last-child');

        //추출한 결과를 저장하기 위한 배열 선언
        let moviess=[],ratess=[] , rsrvss=[];

        //추출된 영화제목 출력
        movies.each((idx,movie)=>{
            let title = dom(movie).text().trim();
            //console.log(dom(movie).text().trim());
            moviess.push(movie);
        });
        
        //추출된 영화평점 출력
        rate.each((idx,rate)=>{
            let point =dom(rate).text().trim();
            //console.log(dom(rate).text().trim());
            ratess.push(point)
        });
        
        //추출된 영화예매율 출력
        rsrvs.each((idx,rsrv)=>{
            let rsrt = dom(rsrv).text().trim();
            //console.log(dom(rsrvs).text().trim());
            rsrvss.push(rsrt);
        });

        for (let i =0; i <moviess.length; ++i){
            console.log(`${moviess[i]} ${ratess[i]} ${rsrvss[i]} `);
        }
        
        
        
        


        //5초 잠시 대기
       // await chrome.sleep(5000)
    }catch (ex){
    console.log(ex);

    }finally {
        await chrome.quit();    //작업이 끝나면 크롬 브라우져 닫기

    }

}


main();