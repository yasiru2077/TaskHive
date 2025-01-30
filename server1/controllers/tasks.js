import { db } from "../connect.js";

export const createTask = (req, res) => {
  const q =
    "insert into tasks (`title`, `description`,`status`,`user_id`) values (?)";

  const values = [
    req.body.title,
    req.body.description || null,
    req.body.status || "pending",
    req.userId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json("Task created successfully!");
  });
};

export const getTasks = (req, res) => {
  const statusFilter = req.query.status || null;
  let q = "select * from tasks where user_id = ?";
  const values = [req.userId];

  if (statusFilter) {
    q += "and status = ?";
    values.push(statusFilter);
  }

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const updateTask = (req, res) => {
  const q =
    "update tasks set `title`= ?,`description`= ?,`status`= ? where `id`= ? and `user_id`= ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.status,
    req.param.id,
    req.userId,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      return res.status(403).json("You can only update your own tasks!");
    }
    return res.status(200).json("Task updated successfully!");
  });
};

export const deleteTask = (req, res) => {
  const q = "delete from tasks where id = ? and user_id = ?";
  const values = [req.params.id, req.userId];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.affectedRows === 0) {
      return res.status(403).json("You can only delete your own tasks!");
    }

    return res.status(200).json("Task delete successfully!");
  });
};
