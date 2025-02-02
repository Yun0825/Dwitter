import { config } from '../config.js';
import mysql from 'mysql2';

const pool = mysql.createPool({
    // shift + alt + i : 각 줄의 끝으로 커서 이동
    // shift + alt + -> : 따옴펴 안의 문자열이나 코드 블록 전체 선택 
    host: config.db.host,
    user: config.db.user,
    database : config.db.database,
    password : config.db.password,
})

export const db = pool.promise();