const pool = require("../db/config");

class AccountBookService {
  static async create(member_id, type, amount, purpose, payment, memo) {
    /** 
     * 기능: 가계부 생성
     * 작성자: 이승연
     */
    const sql = `INSERT INTO account_book (member_id, type, amount, purpose, payment, memo) VALUES ?`;
    const values = [[member_id, type, amount, purpose, payment, memo]];
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql, [values]);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  // 가계부 수정 
  static async modify(type, amount, purpose, payment, memo, id) {
    /** 
     * 기능: 가계부 수정
     * 작성자: 이승연
     */
    const sql = `UPDATE account_book SET type=?, amount=?, purpose=?, payment=?, memo=? WHERE account_book_id=?`;
    const values = [type, amount, purpose, payment, memo, id];
    let connection = null;

    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql, values);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }
 
  static async remove(id) {
    /** 
     * 기능: 가계부 삭제
     * 작성자: 이승연
     */
    const sql = `UPDATE account_book SET state=1 WHERE account_book_id=?`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql, [id]);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookList(member_id) {
    /** 
     * 기능: 가계부 목록
     * 작성자: 허정연
     */
    const sql = `select * from account_book where member_id = '${member_id}' and state = 0 order by reg_date desc;`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  // 잔액조회
  static async getBalance(member_id) {
    /** 
     * 기능: 잔액조회
     * 작성자: 허정연
     */
    const sql = `select balance from have_money where member_id = '${member_id}';`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookDeletedList(member_id) {
    /** 
     * 기능: 삭제된 목록 목록
     * 작성자: 허정연
     */
    const sql = `select * from account_book where member_id = '${member_id}' and state = 1 order by reg_date desc;`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookDetail(id) {
    /** 
     * 기능: 가계부 상세보기
     * 작성자: 허정연
     */
    const sql = `select * from account_book where account_book_id = ${id};`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      return await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  static async accountBookRestore(id) {
    /** 
     * 기능: 가계부 복원하기
     * 작성자: 허정연
     */
    const sql = `update account_book set state = 0 where account_book_id = ${id};`;
    let connection = null;
    try {
      connection = await pool.getConnection(async (conn) => conn);
      await connection.query(sql);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = AccountBookService;