const db = require('../index');

// view all tasks
module.exports.viewAll = (req,res) => {

	let sql = 'SELECT * FROM task'

	db.query(sql, (err,result) => {
		if(err) throw err;
		res.send(result)
	}
	)
}

// view tasks per user
module.exports.view = (req,res) => {
	let id = req.user.user_id;

	let sql = 'SELECT * FROM task WHERE user_id=?'

	db.query(sql, id, (err,result) => {
		if(err) throw err;
		res.send(result)
	}
	)
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
				res.send(result)
			})
		} else {
			res.send("Task Not Found!")
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
				res.send(result)
			})
		} else {
			res.send("Task Not Found!")
		}
	})
}

//update status
module.exports.setStatus = (req,res) => {

}