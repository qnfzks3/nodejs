const mariadb=require('mariadb');
const dbconfig=require('./dbconfig2.js');


async function main(){
    const sql = ' select distinct dong from ' +
        ' zipcode2013 where sido = ? and gugun = ? gugun order by dong ';


    let conn=null;                                                //마리아 db는 옵션 이런게 필요없어서 안쓴다.
    
    let params=['서울','강남구']
    
    try{
        conn=await mariadb.createConnection(dbconfig);
        let result=await conn.execute(sql,params);
        //console.log(result);


        for (let row of result){
            console.log(row.dong)
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





