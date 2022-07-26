const mysql= require('mysql');
const pool=mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'dorm_manage_system',
    port:3306,
})
let a={
    account:'9upLXv',
    student_num:'20225680'
}
pool.query({
    sql: `select * from students where account=:account and student_num=:student_num`,
})