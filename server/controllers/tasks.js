import { db } from "../connect.js";



export const createTask = (req, res) => {
  const q =
    "INSERT INTO tasks (`title`, `description`, `status`, `user_id`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description || null,
    req.body.status || "pending",
    req.userId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Task created successfully!");
  });
};

export const getTasks = (req, res) => {
  const statusFilter = req.query.status || null; // Optional status filter
  let q = "SELECT * FROM tasks WHERE user_id = ?";
  const values = [req.userId];

  if (statusFilter) {
    q += " AND status = ?";
    values.push(statusFilter);
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const updateTask = (req, res) => {
  const q =
    "UPDATE tasks SET `title` = ?, `description` = ?, `status` = ? WHERE `id` = ? AND `user_id` = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.status,
    req.params.id,
    req.userId,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(403).json("You can only update your own tasks!");
    return res.status(200).json("Task updated successfully!");
  });
};

export const deleteTask = (req, res) => {
  const q = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
  const values = [req.params.id, req.userId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(403).json("You can only delete your own tasks!");
    return res.status(200).json("Task deleted successfully!");
  });
};
