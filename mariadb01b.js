const mariadb=require('mariadb');
const dbconfig=require('./dbconfig2.js');


async function main(){
    let sql = ' select distinct sido from zipcode2013 where sido= :sido';
    //'where sido=?'
    //'where sido= :sido';

    let conn=null;                                                //마리아 db는 옵션 이런게 필요없어서 안쓴다.
    //let params=['서울'];
    let params={sido:'서울'}


    try{
        conn=await mariadb.createConnection(dbconfig);

        //console.log(result);

        //let result = await conn.execute(sql,params);
        let result = await conn.execute({namedPlaceholders:true, sql:sql},params);


        for (let row of result){
            console.log(row.gugun);
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





