import { db } from "../connect.js";

export const createArtWork = (req, res) => {
  const q =
    "INSERT INTO artWorks (`title`,`description`,`artworkImage`,`price`,`quantity`,`categoryId`,`user_id`) VALUE (?)";

  const values = [
    req.body.title,
    req.body.description || null,
    req.body.artworkImage,
    req.body.price,
    req.body.quantity,
    req.body.categoryId,
    req.body.userId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("artwork created successfully");
  });
};

export const getArtWorks = (req, res) => {
  let q = "SELECT * FROM artWorks WHERE user_id = ?";

  const values = [req.userId];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

export const getAllArtWork = (req, res) => {
  let q = "SELECT * FROM artworks";

  if (err) {
    return res.status(500).json(err);
  }

  return res.status(200).json(data);
};

export const updateArtWork = (req, res) => {
  const q =
    "UPDATE artWorks SET `title` = ?,`description`= ?,`artworkImage`= ?,`price`= ?,`quantity`= ?,`categoryId`= ? WHERE `id`= ? AND `user_id`=?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.artworkImage,
    req.body.price,
    req.body.quantity,
    req.body.categoryId,
    req.params.id,
    req.body.userId,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.affectedRows === 0) {
      return res.status(403).json("You can only update your own artwork!");
    }

    return res.status(200).json("artwork updated successfully!");
  });
};

export const deleteArtwork = (req, res) => {
  const q = "DELETE FROM artWorks WHERE id = ? AND user_id = ?";

  const values = [req.params.id, req.userId];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.affectedRows === 0) {
      return res.status(403).json("You can only delete your own artwork");
    }

    return res.status(200).json("Artwork deleted successfully!");
  });
};
