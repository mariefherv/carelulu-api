const e = require('express');
const db = require('../index');

// view tasks by user
module.exports.view = (req,res) => {
	let id = req.user.user_id;

	// get date now then check first if user has overdue deadlines
	dateNow = JSON.stringify(new Date())
	
	let sql = `SELECT * FROM task WHERE user_id=${id} AND deadline < ${dateNow}`

	// query for all tasks
	let new_sql = `SELECT * FROM task WHERE user_id=${id}`

	db.query(sql, (err,result) => {
		if(err) throw err;
		if(result.length !== 0){
			result.forEach(element => {
				if(element.status === "In Progress"){
					sql2 = `UPDATE task SET status="Overdue" WHERE task_id = ${element.task_id}`
					db.query(sql2, (err,result) => {
						if(err) throw err
				})}
			})
			//after updating values
			db.query(new_sql, (err,result) => {
				if(err) throw err;
				res.send(result)
			})
		} else {
			//if there are no overdues, return all tasks
			db.query(new_sql, (err,result) => {
				if(err) throw err;
				res.send(result)
			}
			)
		}
	})
}


// create new task
module.exports.create = (req,res) => {
	let task = {
		title:req.body.title,
		note:req.body.note,
		user_id:req.user.user_id,
		deadline:req.body.deadline,
	}

	let sql = 'INSERT INTO task SET ?'

	db.query(sql, task, (err,result) => {
		if(err) throw err;
		res.send(result)
	}
	)
}
	
// edit task
module.exports.edit = (req,res) => {
	let sql = `SELECT * FROM task WHERE user_id=${req.user.user_id} AND task_id=${req.params.task_id}`

	db.query(sql, (err, result) => {
		if(err) throw err;
		if(result.length !== 0){
			let task = {
				title:req.body.title,
				note:req.body.note,
				deadline:req.body.deadline,
				status:req.body.status
			}

			sql = `UPDATE task SET ? WHERE task_id=${req.params.task_id}`

			db.query(sql, task, (err,result) => {
				if(err) throw err;
				res.send(true)
			})
		} else {
			res.send(false)
		}
	})

}

// delete task
module.exports.delete = (req,res) => {
	let sql = `SELECT * FROM task WHERE user_id=${req.user.user_id} AND task_id=${req.params.task_id}`

	db.query(sql, (err, result) => {
		if(err) throw err;
		if(result.length !== 0){
			sql = `DELETE FROM task WHERE task_id=${req.params.task_id}`

			db.query(sql, (err,result) => {
				if(err) throw err;
				res.send(true)
			})
		} else {
			res.send(false)
		}
	})
}

//update status
module.exports.setStatus = (req,res) => {
	let sql = `SELECT * FROM task WHERE user_id=${req.user.user_id} AND task_id=${req.params.task_id}`

	db.query(sql, (err, result) => {
		if(err) throw err;
		if(result.length !== 0){
			sql = `UPDATE task SET status="Done" WHERE task_id=${req.params.task_id}`

			db.query(sql, (err,result) => {
				if(err) throw err;
				res.send(result)
			})
		} else {
			res.send(false)
		}
	})
	
}