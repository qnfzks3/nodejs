// 셀레니엄을 이용해서 k-apt.go.kt에서
// 2023년, 1월, 서울특별시, 강남구, 삼성동, 아이파크삼성동의
// 지상/지하 주차장수 추출

const { Builder, Browser, By, Key, until, Select } = require('selenium-webdriver');

async function main() {
    const URL = 'http://k-apt.go.kr';
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .build();

    try {
        await chrome.get(URL);

        // 우리단지 기본정보 버튼이 표시될때까지 5초 대기
        // await chrome.wait(until.elementLocated(By.css('ul.wp220 li a')), 5000);  /*('ul.wp220 li a') 이 경로가 화면에 출력 될때까지*/
        await chrome.wait(until.elementLocated(By.xpath('//a[@title="우리단지 기본정보"]')), 5000);

        // 단지정보 버튼 클릭
        //let menu = await chrome.findElement(By.css('#nav > ul > li:nth-child(1) > a'));
        let menu = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));  //xml 특정 요소를 지칭할때 xpath,
                                                                                       // a은 모든 a 를 지칭 하고 @는 속성 -title="단지정보"인 a 태그
        await chrome.actions().move({origin: menu})
            .click().perform();
        await sleep(1000);

        // 우리단지 기본정보 버튼 클릭
        //menu = await chrome.findElement(By.css('ul.wp220 li a'));
        menu = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin: menu})
            .click().perform();
        await sleep(1000);

        // ----------------------
        // 검색할 아파트를 변수로 선언
        let syear = '2023년';
        let smonth = '01월';
        let sido = '서울특별시';
        let gugun = '강남구';
        let dong = '삼성동';
        let apt = '아이파크삼성동';

        // 검색년도 값 설정
        let select = await chrome.findElement(By.name('searchYYYY'));
        await new Select(select).selectByVisibleText(syear);
        await sleep(500);

        // 검색월 값 설정
        select = await chrome.findElement(By.name('searchMM'));   //요소를 찾고 요소를 찾으면
        await new Select(select).selectByVisibleText(smonth);         // 그 요소가 셀렉트일시 이렇게 찾아간다.
        await sleep(500);

        // 검색시도 값 설정
        select = await chrome.findElement(By.name('combo_SIDO'));
        await new Select(select).selectByVisibleText(sido);
        await sleep(500);

        // 검색구군 값 설정
        select = await chrome.findElement(By.name('combo_SGG'));
        await new Select(select).selectByVisibleText(gugun);
        await sleep(500);

        // 검색동 값 설정
        select = await chrome.findElement(By.name('combo_EMD'));
        await new Select(select).selectByVisibleText(dong); // 이건 보이는 텍스트 -HTML 웹 페이지에서 특정 텍스트가 보여지는 옵션을 선택하는 데 사용됩니다.
                                                             // 해당 이름을 찾는데 사용(dong)
        await sleep(500);

        // 검색결과 출력 - 아파트명, 주소
        let apts = await chrome.findElements(By.css('.aptS_rLName'));
        let aptaddrs = await chrome.findElements(By.css('.aptS_rLAdd'));
        await sleep(3000);

        for(let apt of apts) {
            console.log(await apt.getAttribute('textContent'));
        }
        await sleep(3000);

        for(let addr of aptaddrs) {
            console.log(await addr.getAttribute('textContent'));
        }
        await chrome.sleep(3000);
        
        
        // 아이파크 삼성동 항목을 찾아 클릭
        let idx=0;
        for(let val of apts){
            console.log(`${idx++} ${val.getAttribute('textContent')}`)
            if (await val.getText()==apt) break;   /*val.getText()가 apt 아파트 이름과 같으면 break*/

        }

        //추출한 인덱스 값을 이용해서 항목 직접 클릭
        menu=await chrome.findElement(
            By.css(`.mCSB_container ul li:nth-child(${idx})a`));

        await chrome.actions().move({origin: menu}).click().perform();

        /*await chrome.executeScript('arguments[0].click();',apts[--idx]);*/
        await chrome.sleep(1500);
        
    } catch (ex) {
        console.log(ex);
    } finally {
        await chrome.quit();
    }
//--------------------------------------------------
   //관리시설 정보 클릭
    await chrome.wait(until.elementLocated(
        By.css('.lnbNav li:nth-child(3) a')),5000
    )
    await chrome.actions().move({origin: menu})
        .click().perform();

    await sleep(1000);




    //지상/지하 주차장 대수 추출
    let pcnt = await chrome.findElement(By.css('#kaptd_pcnt')).getText();
    let pcntu= await chrome.findElement(By.css('#kaptd_pcntu')).getText();
    let tpcnt= await chrome.findElement(By.css('#kaptd_total_pcnt')).getText();       //getText() 눈에 보이는거 들고올때 사용 ,안보이면 ATTRIBUTE

    console.log(pcnt,pcntu,tpcnt);
    await sleep(3000);




} // main

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

main();