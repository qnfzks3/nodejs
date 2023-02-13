// movie.daum.net 사이트에서 '상영중인 영화'에 대한 정보를 긁어오기
// https://movie.daum.net/main
// 순위, 영화제목, 예약율, 평점



/*selenium

웹브라우저를 이용한 작업들을 자동화할 수 있도록 특수제작된 브라우저
axios로 스크래핑할 수 없는 동적 데이터를 포함하는 웹 페이지를
원격 조작이 가능한 웹브라우저를 이용해서 처리
로그인을 해서 특정정보를 추출하거나, 반복적인 작업을 통해 정보를 추출하거나
마우스 클릭등 무인으로 프로그램을 조작해야 할 필요가 있는 경우
브라우져 자동화 프로그램인 '셀레니엄'을 이용하면 처리 가능
https://www.npmjs.com/package/selenium-webdriver
    https://www.selenium.dev/documentation/webdriver/getting_started*/

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const url = require("url");

async function main() {   // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    const URL = 'https://movie.daum.net/main';

    // 크롬 자동화 브라우져 객체 생성
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .setChromeOptions()
        .build();

    try {
        // 지정한 url로 접속
        await chrome.get(URL);

        // 특정 요소가 화면에 위치할때까지 최대 5초간 기다려 줌
        await chrome.wait(
            until.elementLocated(By.css(
                '.feature_home div:nth-child(3).slide_ranking .tit_item')), 5000);

        // 영화제목들, 평점, 예매율 추출
        let movies = await chrome.findElements(By.css(
            '.feature_home div:nth-child(3).slide_ranking .tit_item'));
        let rates = await chrome.findElements(By.css(
            '.feature_home div:nth-child(3).slide_ranking .txt_num:first-child'));
        let rsrvs = await chrome.findElements(By.css(
            '.feature_home div:nth-child(3).slide_ranking .txt_num:last-child'));

        // 추출한 결과를 저장하기 위한 배열 선언
        let moviess = [], ratess = [], rsrvss = [];

        // 추출된 영화제목 출력
        for (let movie of movies) {
            // console.log(await movie.getText()); // 눈에 보이는 요소의 텍스트만 출력
            let title = await movie.getAttribute('textContent');
            // console.log(title.trim());
            moviess.push(title.trim());
        };

        // 추출된 평점 출력
        for (let rate of rates) {
            let point = (await rate.getAttribute('textContent')).trim();
            // console.log(point);
            ratess.push(point);
        };

        // 추출된 예매율 출력
        for (let rsrv of rsrvs) {
            let rsrt = (await rsrv.getAttribute('textContent')).trim();
            // console.log(rsrt);
            rsrvss.push(rsrt);
        };

        // 한번에 모아서 출력
        for(let i = 0; i < moviess.length; ++i) {
            console.log(`${moviess[i]} ${ratess[i]} ${rsrvss[i]}`);
        }

    } catch (ex) {
        console.log(ex);
    } finally {
        await chrome.quit();   // 크롬 브라우져 닫기
    }

};

main();