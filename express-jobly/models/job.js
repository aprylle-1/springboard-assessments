"use strict";

const e = require("express");
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
   * Returns [{ id, title, salary, equity, companyHandle}, ...]
   * 
   **/
    static async findAll(filter) {
        const curr_keys = Object.keys(filter)
        let keys = []
        curr_keys.forEach(key => {
            if (["title", "minSalary", "hasEquity"].includes(key)){
                if (key === "hasEquity"){
                    if (filter["hasEquity"] === "false"){
                        keys = keys;
                    }
                    else{
                        keys.push(key)
                    }
                }
                else{
                    keys.push(key)
                }
            }
        })
        if (keys.length === 0){
            const results = await db.query(
                `SELECT id, title, salary, equity, company_handle
                 AS "companyHandle"
                 FROM jobs;`)
            
            const jobs = results.rows
            
            return jobs;
        }

        else {
            const key_query = {
                "title" : "title iLIKE",
                "minSalary" : "salary >=",
                "hasEquity" :  `equity > 0`
                }
            let query = 
            `SELECT id, title, salary, equity, company_handle AS "companyHandle"
             FROM jobs
             WHERE
            `
            let count = 1
            let filterValues = []
            keys.forEach((key, idx) =>{
                if (idx === 0) {
                    query += " "
                }
                else {
                    query += " AND "
                }
                if (key === "hasEquity") {
                    if (filter["hasEquity"] === "true"){
                        query += `${key_query["hasEquity"]}`
                    }
                }
                else{
                    if (key === "title"){
                        filterValues.push(`%${filter[key]}%`)
                    }
                    else{
                        filterValues.push(filter[key])
                    }
                    query += `${key_query[key]} $${count}`;
                    console.log(query)
                    count += 1;
                }
            })
            
            const results = await db.query(query, filterValues);
            
            const jobs = results.rows;

            return jobs;
        }
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

  /**
   * Get all jobs associated with a specific company
   */
  static async findAllJobsForCompany(handle){
    const result = await db.query(`SELECT id, title, salary, equity FROM jobs WHERE company_handle = $1`, [handle])
    
    const jobs = result.rows

    return jobs;
  }
}

module.exports = Job