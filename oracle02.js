

const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');  //db연결정보 파일

async function main() {

    let sql1 = ' create table sungjuk (name varchar(100), kor number(3), eng number(3), mat number(3)) ';

    let sql2=' insert into sungjuk values (:1,:2,:3,:4) ';                        //테이블? 이라는
    let sql3=' update sungjuk set kor = :1, eng= :2, mat = :3  where name= 4 ';
    let sql4=' delete from sungjuk where name=:1 ';
    let sql5=' select * from sungjuk ';

    let params = [];
    let conn = null;

    try {
        oracledb.initOracleClient(
            {libDir: 'c:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(
            dbconfig
        );

        //let result = await conn.execute(sql1);    // 테이블 생성  넣을 대상 자료
        
        //params=['혜성',99,98,99];                        // 넣을 대상 자료
        //let result = await conn.execute(sql2,params);   //오라클은 재대로 처리하기위해선 커밋까지 실행해야 서버에 값이 들어간다. -  aws  오라클 빅데이터 에 넣기
       //await conn.commit();   // 커밋 시키기

        //params=[11,22,3,'혜교'];
        //let result=await conn.execute(sql3,params);
        //await conn.commit();


        params=['혜성'];                               //대 상 자료  -  테이블안에 혜성이라는 이름의 줄을 다 삭제 한다.
        let result = await conn.execute(sql4,params);
        await conn.commit();

       // result = await conn.execute(sql5);

        console.log(result);


        
        
        

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