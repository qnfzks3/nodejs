// 셀레니엄을 이용해서 네이버 받은 매일 수 조회 후 출력
// The ChromeDriver could not be found on the current PATH, trying Selenium Manager 셀레니엄을 사용하기 위해 크롬 드라이버를 받아야한다.

const {Builder, Browser, By, Key, until, select}= require('selenium-webdriver');
const ncp=require('copy-paste')

async function main(){
    const  URL = 'http://www.naver.com';
    const  chrome = await new Builder().forBrowser(Browser.CHROME)
        .build();

    try{
        //사이트 접속
        await  chrome.get(URL);

        //로그인 버튼이 재대로 나타날 때 까지 최대 5초까지 대기
        await chrome.wait(until.elementsLocated(By.css('.link_login')),5000);

        //로그인 버튼을 찾아 클릭
        let loginbtn=await chrome.findElement(By.css('.link_login'));

        await chrome.actions().move({origin:loginbtn}).click().perform();   /*마우스로 클릭을 할거다*/

        sleep(1000);  //1초 동안 잠시 대기

        //-----------------------------------
        const uid=await chrome.findElement(By.css('#id'));
        const pwd=await chrome.findElement(By.css('#pw'));
        loginbtn=await chrome.findElement(By.css('.btn_login'));

        /* 이렇게 하면 네이버에서 봇으로 감지 하기 때문에 2차인증 하도록 만듬
        
        //아이디를 uid 객체에 입력
        await chrome.actions().sendKeys(uid,'dltpcjf1005').perform();
        await sleep(1000);


        //비밀번호를 pwd 객체에 입력
        await chrome.actions().sendKeys(pwd,'dltpcjf1005').perform();
        await sleep(1000);


        그러면 어떻게 할까?   메모장이나 클립보드에 적어놓고 복사/붙여넣기해서 로그인창에 아이디 비번 처서 로그인 시도해서 들어간다.
        클립보드 복사 모듈 :copy-paste
        */

        ncp.copy('dltpcjf1005');  //복사 붙여넣기 하고나서
        await chrome.actions().click(uid).keyDown(Key.CONTROL).sendKeys('v').perform();   //uid클릭해서 컨트롤 누르고 v 를 눌러서 붙여넣는다.
        await sleep(1000);

        ncp.copy('dltpcjf1005**');
        await chrome.actions().click(pwd).keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(1000);


        //로그인 버튼 클릭
        await chrome.actions().move({origin:loginbtn}).click().perform();

        await sleep(1000);
        //-------------------------------------------------------------------------------------------


        
        
        
        
    }catch(ex){
        console.log(ex)

    }finally {
        await chrome.sleep(3000);
        /*await chrome.quit();*/

    }
}

//일정시간 셀레니엄이 대기하도록 만드는 함수
const sleep = (ms)=> new Promise(resolve => setTimeout(resolve,ms));   /*setTimeout: ms가 지난후에 resove를 실행한다. - 시간지연*/

main();

