// zipcode2013 테이블에서
// 서울시, 강남구에 있는 모든 동을 조회해서 출력하세요

// zipcode2013 테이블에서
// 서울에 있는 모든 구를 조회해서 출력하세요

const mariadb = require('mariadb');
const dbconfig = require('./dbconfig2.js');

async function main() {
    const sql = ' select distinct dong from ' +
        ' zipcode2013 where sido = ? and gugun = ? order by dong ';

    let conn = null;
    let params = ['서울', '강남구']

    try {
        conn = await mariadb.createConnection(dbconfig);

        let result = await conn.execute(sql, params);

        for(let row of result) {
            console.log(row.dong);
        }
    } catch (ex) {
        console.error(ex)
    } finally {
        if (conn) {
            try { await conn.close(); }
            catch (ex) { }
        }
    }
}; // main