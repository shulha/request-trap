const TrapModel = require('./trap.model');

exports.create = (req, res) => {
  const newTrap = new TrapModel({
    trap_id: req.params.trap_id,
    remote_ip: req.ip,
    method: req.method,
    scheme: req.protocol,
    body: req.body,
    query_params: req.query,
    cookies: req.cookies,
    headers: req.headers,
  });

  newTrap.save((err, trap) => {
    if (err) res.status(500).json({ status: 500, message: err.message });

    res.status(201).json({ status: 201, message: `${trap.trap_id} has created` });
  });
};

exports.show = (req, res) => {
  TrapModel
    .find({ trap_id: req.params.trap_id })
    .sort([['created_at', 'descending']])
    .exec((err, requests) => {
      if (err) res.send(err);

      res.render('traps/show', {
        title: 'Show trap',
        trap_id: req.params.trap_id,
        requests,
      });
    });
};
