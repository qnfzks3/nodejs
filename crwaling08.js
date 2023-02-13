// 셀레니엄을 이용해서 k-apt.go.kr 에서 2023년 , 1월 , 서울특별시 , 강남구 , 삼성동 , 아이파크 삼성 apt의
//지상/지하 주차장수 추출

const {Builder, Browser, By, Key, until, select}= require('selenium-webdriver');




async function main() {
    const URL = 'http://k-apt.go.kr';
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .build();

    try{
        await chrome.get(URL);
        //기본 단지 기본 정보 버튼이 표시 될 때 까지 5초 대기
        await chrome.wait(until.elementsLocated(By.css('ul.wp220 li a')),5000); /*이게('ul.wp220 li a') 화면에 출력 될때까지*/

        //단지정보 버튼 클릭
        /*let menu = await chrome.findElement(By.css('#nav>ul>li:nth-child(1)>a'));*/
        let menu = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));  //xml 특정 요소를 지칭할때 xpath, //a은 모든 a 를 지칭 하고 @는 속성 -title="단지정보"인 a 태그
        await chrome.actions().move({origin:menu}).click().perform();
        await sleep(1000);


        //우리단지 기본정보 버튼 클릭



        await chrome.sleep(3000);

    }catch (ex){
        console.log(ex);
    }finally {
        await chrome.quit();
    }

}