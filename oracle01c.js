//zipcode2013테이블에서 서울,강남구에 있는 모든 동를 조회해서 출력하세요
const oracledb=require('oracledb');

async function main(){     //async 함수로 선언 되어 있어서 비동기로 동작합니다.

    //const sql="select distinct gugun from" +"zipcode2013 where sido = '서울'" +"order by gugun";  //실행할 sql 문  정의


    //const sql=' select distinct dong from ' +' zipcode2013 where sido = :1 and gugun = :2 order by dong ';  //실행할 sql 문  정의


    const sql=' select distinct dong from zipcode2013 where sido = :sido and gugun = :gugun order by dong ';  //실행할 sql 문  정의

    //let params=['경기'];                                          //보통 insert, update,delet,where 절을 많이 사용한다.
    let params=[sido:'경기', gugun:'강남구'];                                          //보통 insert, update,delet,where 절을 많이 사용한다.
    let options={
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT        // 반드시 이 옵션(outFormat)이 설정 되어있어야한다.
    }; //oracle db를 위한 옵션 정의

    let conn =null; //디비 연결 객체

    try{          //try 이걸 실행 하고 안되면  catch(ex)로 함  - 예외처리              //3 작성순서
        //오라클 인스턴스 클라이언트 초기화
        await oracledb.initOracleClient(
            {libDir: 'C:/Java/instantclient_19_17'});

        //오라클 접속정보를 이용해서 오라클 연결객체 하나 생성
        conn=await oracledb.getConnection({
            user:'bigdata', password:'bigdata',connectionString:'13.124.192.232:1521/XE'             /*  ip주소:포트번호/SID*/
        });
        console.log('오라클 데이터베이스 접속 성공!!')

        //sql문을 실행하고 결과를 받아옴
        let result = await conn.execute(sql, params, options);

        //실행결과를 결과집합 객체로 변환
        let rs= result.resultSet;

        //결과집합 객체의 각 요소를 순회하면서 내용 출력
        let row=null;
        while ((row=await rs.getRow())){
            console.log(row.gugun);
        }

        //작업이 끝나면 결과집합 객체를 닫음
        await rs.close();

    }catch (ex){                               // 1
        console.error(ex);
    }finally {                                 //2
        if(conn){         /*만약 conn이 열려있으면 다시 닫아*/
            try{
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공!!')
            }catch (ex){
                console.error(ex);
            }

        }

    }

}

main();

