"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
    const newJob = {
      title: "new",
      salary: 1000,
      equity : 0.75,
      companyHandle : "c1"
    };

  test("ok for users : must be admin", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job : {
        id : expect.any(Number),
        title : "new",
        salary : 1000,
        equity : "0.75",
        companyHandle : "c1"
      }
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
            title : "new",
            salary : 1000,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
            title: "new",
            salary: "invalidvalue",
            equity : 0.75,
            companyHandle : "c1"
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /companies", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs :
        [
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
        ]
    });
  });

  test("works with filters, title only", async function () {
    const resp = await request(app).get("/jobs?title=j1");
    expect(resp.body).toEqual({"jobs" : [
        {
          id : expect.any(Number),
          title : "j1",
          salary : 10000,
          equity : "0.5",
          companyHandle : 'c1'
        }
    ]});
  });

  test("works with filters, minSalary only", async function () {
    const resp = await request(app).get("/jobs?minSalary=20000&fsfd=dasfsdfsd");
    expect(resp.body).toEqual({"jobs" : [
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
    ]});
  });

  test("works with filters, hasEquity only", async function () {
    const newJob = {
      title: "new",
      salary: null,
      equity : null,
      companyHandle : "c1"
    };
    
    const jobWithNullValue = await request(app)
        .post("/jobs")
        .send(newJob)
        .set("authorization", `Bearer ${adminToken}`);
    
    const resp = await request(app).get("/jobs?hasEquity=false");
    expect(resp.body).toEqual({"jobs" : [
        {
          id : expect.any(Number),
          title: "new",
          salary: null,
          equity : null,
          companyHandle : "c1"
        }
    ]});
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
        .get("/jobs")
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const newJob = {
        title: "new",
        salary: 1000,
        equity : 0.75,
        companyHandle : "c1"
      };

    const createdJob = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);
    const id = createdJob.body.job.id
    const resp = await request(app).get(`/jobs/${id}`);
    expect(resp.body).toEqual({
      job: {
        id: expect.any(Number),
        title: "new",
        salary: 1000,
        equity : "0.75",
        companyHandle : "c1"
      }
    });
  });

//   test("works for anon: company w/o jobs", async function () {
//     const resp = await request(app).get(`/companies/c2`);
//     expect(resp.body).toEqual({
//       company: {
//         handle: "c2",
//         name: "C2",
//         description: "Desc2",
//         numEmployees: 2,
//         logoUrl: "http://c2.img",
//       },
//     });
//   });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
  test("works for users", async function () {
    const newJob = {
        title: "new",
        salary: 1000,
        equity : 0.75,
        companyHandle : "c1"
      };

    const createdJob = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);
    const id = createdJob.body.job.id
    
    const resp = await request(app)
        .patch(`/jobs/${id}`)
        .send({
          title: "Updated",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      job: {
        id : expect.any(Number),
        title : "Updated",
        salary: 1000,
        equity : "0.75",
        companyHandle : "c1"
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          name: "C1-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such company", async function () {
    const resp = await request(app)
        .patch(`/jobs/0`)
        .send({
          title: "new Updated",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on handle change attempt", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          handle: "c1-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
        .patch(`/jobs/1`)
        .send({
          salary: "Not an integer"
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /companies/:handle", function () {
  test("works for users", async function () {
    const newJob = {
        title: "new",
        salary: 1000,
        equity : 0.75,
        companyHandle : "c1"
      };

    const createdJob = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);
    const id = createdJob.body.job.id
    
    const resp = await request(app)
        .delete(`/jobs/${id}`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: `${id}` });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/jobs/1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such job", async function () {
    const resp = await request(app)
        .delete(`/jobs/0`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
