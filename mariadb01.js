const mariadb=require('mariadb');
const dbconfig=require('./dbconfig2.js');


async function main(){
    let sql = ' select distinct sido from zipcode2013 ';

    let conn=null;                                                //마리아 db는 옵션 이런게 필요없어서 안쓴다.
    try{
        conn=await mariadb.createConnection(dbconfig);
        let result=await conn.execute(sql);
        //console.log(result);


        for (let row of result){
            console.log(row.sido)
        }

    }catch (ex){
        console.error(ex)
    }finally {
        if (conn){
            try {
                await conn.close();
            }catch (ex){}
        }
    }


}

main();





