const oracledb=require('oracledb');

async function main(){

    const sql='select distinct sido from zipcode2013';  //실행할 sql 문  정의
    let params={};                                          //보통 insert, update,delet,where 절을 많이 사용한다.
    let options={
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT        // 반드시 이 옵션(outFormat)이 설정 되어있어야한다.
    }; //oracle db를 위한 옵션 정의

    let conn =null; //디비 연결 객체

    try{          //try 이걸 실행 하고 안되면  catch(ex)로 함  - 예외처리
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
            console.log(row.SIDO);
        }

        //작업이 끝나면 결과집합 객체를 닫음
        rs.close();

    }catch (ex){
        console.log(ex);
    }finally {
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