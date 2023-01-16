"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title , salary, equity, comp_handle }
   *
   * Returns { title, salary, equity, comp-handle}
   *
   * */

    static async create ({title, salary, equity, companyHandle}) {
        const company = await db.query(
            `SELECT handle 
             FROM companies
             WHERE handle = $1`,[companyHandle]);

        if (!company.rows) {
            throw new BadRequestError(`Invalid company: No company with handle ${handle}`)
        }

        const result = await db.query(
            `INSERT INTO jobs
             (title, salary, equity, company_handle)
             VALUES ($1, $2, $3, $4)
             RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
             [
                title,
                salary,
                equity,
                companyHandle
             ]
        );

        const job = result.rows[0];

        return job;
    };

 /** Find all jobs.
   *
   * Returns [{ title, salary, equity, companyHandle}, ...]
   * 
   **/
    static async findAll() {
        const results = await db.query(
            `SELECT id, title, salary, equity, company_handle
             AS "companyHandle"
             FROM jobs;`)

        const jobs = results.rows

        return jobs;
    }

  /** Given a job id, return data about job.
   *
   * Returns { title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   **/

    static async get(id) {
        const result = await db.query(
            `SELECT id, title, salary, equity, company_handle
             AS "companyHandle"
             FROM jobs
             WHERE id = $1`,
             [id]
        )

        const job = result.rows[0]

        if (!job) throw new NotFoundError(`No job with ID ${id}`)

        return job
    }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   */
    static async update(id, data) {
        const job = await db.query(
            `SELECT title, salary, equity, company_handle
             AS "companyHandle"
             FROM jobs
             WHERE id = $1`,
             [id]
        )

        if (!job.rows[0]) throw new NotFoundError(`No job with ID ${id}`)

        const { setCols, values } = sqlForPartialUpdate(data, { "companyHandle" : "company_handle" })

        const idx =  `$${values.length + 1}`
        
        const result = await db.query(
            `UPDATE jobs
             SET ${setCols}
             WHERE id = ${idx}
             RETURNING id,
                       title,
                       salary,
                       equity,
                       company_handle AS "companyHandle"
            `,
            [...values, id]);

        return result.rows[0]
    }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
        [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job with ID ${id}`);
  }
}

module.exports = Job