const db = require("../config/db");

exports.getMembers = (req, res) => {
  db.all("SELECT * FROM members", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
};

exports.addMember = (req, res) => {
  const { name, plan, joinDate } = req.body;

  db.run(
    `INSERT INTO members(name, plan, joinDate)
     VALUES (?, ?, ?)`,
    [name, plan, joinDate],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        message: "Member added",
      });
    }
  );
};

exports.updateMember = (req, res) => {
  const { name, plan, joinDate } = req.body;

  db.run(
    `UPDATE members
     SET name=?, plan=?, joinDate=?
     WHERE id=?`,
    [name, plan, joinDate, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Member updated",
      });
    }
  );
};

exports.deleteMember = (req, res) => {
  db.run(
    `DELETE FROM members WHERE id=?`,
    req.params.id,
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Member deleted",
      });
    }
  );
};