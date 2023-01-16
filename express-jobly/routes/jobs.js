"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json")
const jobFilterSchema = require("../schemas/jobFilter.json")
const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, compHandle }
 *
 * Returns { title, salary, equity, compHandle }
 *
 * Authorization required: Admin
 */

router.post('/', ensureAdmin, async (req, res, next)=>{
    try{
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError (errs);
        }
        const {title, salary, equity, companyHandle} = req.body;
        const job = await Job.create({title, salary, equity, companyHandle});
        return res.status(201).json({ job });
    }
    catch(err){
        return next(err)
    }
})

/** GET /  =>
 *   { jobs: [ { title, salary, equity, compHandle }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get('/', async (req, res, next)=> {
    try{
        console.log(req.query)
        const jobs = await Job.findAll(req.query);
        return res.status(200).json({ jobs });
    }
    catch(err){
        return next(err);
    }
});

/** 
 * GET /:id =>
 *  { job : { title, salary, equity, compHandle }}
 * 
 * Authorization required: none
*/

router.get('/:id', async (req, res, next) => {
    try{
        const job = await Job.get(req.params.id)

        return res.status(200).json({ job })
    }
    catch(err){
        return next(err);
    }
})

/** PATCH /[id] { fld1, fld2, ... } => { id }
 *
 * Patches id data.
 *
 * fields can be: { title, salary, equity }
 *
 * Returns { title, salary, equity, companyHandle}
 *
 * Authorization required: Admin
 */

router.patch('/:id', ensureAdmin, async (req, res, next)=>{
    try{
        const validator = jsonschema.validate(req.body, jobUpdateSchema);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const job = await Job.update(req.params.id, req.body)

        return res.status(200).json({ job });
    }
    catch(err){
        return next(err);
    }
})

/** DELETE /[id]  =>  { deleted: handle }
 *
 * Authorization: Admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
      await Job.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;