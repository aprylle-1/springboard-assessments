"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
      title: "new",
      salary: 1000,
      equity : 0.75,
      companyHandle : "c1"
    };
  
    test("works", async function () {
      let job = await Job.create(newJob);
      const id = job.id
      expect(job).toEqual({
        id : expect.any(Number),
        title: "new",
        salary: 1000,
        /* pg seems to return the numeric data type as a string */
        equity : "0.75",
        companyHandle : "c1"
      });

      const result = await db.query(`
        SELECT title, salary, equity, company_handle AS "companyHandle"
        FROM jobs
        WHERE id = $1`, [id])

        expect(result.rows[0]).toEqual({
            title: "new",
            salary: 1000,
            /* pg seems to return the numeric data type as a string */
            equity : "0.75",
            companyHandle : "c1"
          })
    })
})

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
      let jobs = await Job.findAll({});
      expect(jobs).toEqual([
        {
            id : expect.any(Number),
            title : "j1",
            salary : 10000,
            equity : "0.5",
            companyHandle : 'c1'
        },
        {
            id : expect.any(Number),
            title : "j2",
            salary : 20000,
            equity : "0.75",
            companyHandle : 'c2'
        },
        {
            id : expect.any(Number),
            title : "j3",
            salary : 30000,
            equity : "0.65",
            companyHandle : 'c1'
        },
        {
            id : expect.any(Number),
            title : "j4",
            salary : 10000,
            equity : "0.1",
            companyHandle : 'c3'
        }
      ]);
  });

  test("works: with filter", async function () {
      const filter = {
        "title" : "j",
        "minSalary" : "20000",
        "hasEquity" : "true"
      }
      let jobs = await Job.findAll(filter);
      expect(jobs).toEqual([
        {
            id : expect.any(Number),
            title : "j2",
            salary : 20000,
            equity : "0.75",
            companyHandle : 'c2'
        },
        {
            id : expect.any(Number),
            title : "j3",
            salary : 30000,
            equity : "0.65",
            companyHandle : 'c1'
        }
      ]);
  });
});

/************************************** get */

describe("get", function () {
  const newJob = {
    title: "new",
    salary: 1000,
    equity : 0.75,
    companyHandle : "c1"
  };

  test("works", async function () {
    let createdJob = await Job.create(newJob);
    const id = createdJob.id;
    let job = await Job.get(id)
    expect(job).toEqual({
      id : expect.any(Number),
      title : "new",
      salary : 1000,
      equity : "0.75",
      companyHandle : "c1"
    })
  });

  test("not found if no such job", async function () {
    try {
      await Job.get("0");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "Updated",
    salary: 50000,
    equity : 1.0,
  };

  const newJob = {
    title: "new",
    salary: 1000,
    equity : 0.75,
    companyHandle : "c1"
  };

  test("works", async function () {
    const createdJob = await Job.create(newJob)
    const id = createdJob.id
    let job = await Job.update(id, updateData);
    expect(job).toEqual({
      id: id,
      title: "Updated",
      salary : 50000,
      equity : "1",
      companyHandle: "c1"
    });

    const result = await db.query(
      `SELECT title, salary, equity, company_handle AS "companyHandle"
       FROM jobs
       WHERE id = $1`, [id]);

    expect(result.rows).toEqual([{
      title: "Updated",
      salary: 50000,
      equity : "1",
      companyHandle : "c1"
    }]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "Updated",
      salary: null,
      equity: null,
    };

    const createdJob = await Job.create(newJob)
    const id = createdJob.id
    let job = await Job.update(id, updateDataSetNulls);
    expect(job).toEqual({
      id: id,
      title: "Updated",
      salary : null,
      equity : null,
      companyHandle: "c1"
    });

    const result = await db.query(
      `SELECT title, salary, equity, company_handle AS "companyHandle"
       FROM jobs
       WHERE id = $1`, [id]);

    expect(result.rows).toEqual([{
      title: "Updated",
      salary: null,
      equity : null,
      companyHandle : "c1"
    }]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      const createdJob = await Job.create(newJob)
      const id = createdJob.id
      await Job.update(id, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  const newJob = {
    title: "new",
    salary: 1000,
    equity : 0.75,
    companyHandle : "c1"
  };
  test("works", async function () {
    const createdJob = await Job.create(newJob)
    const id = createdJob.id
    await Job.remove(id);
    const res = await db.query(
        "SELECT id FROM jobs WHERE id= $1", [id]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});