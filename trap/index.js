const TrapModel = require('./trap.model');

exports.create = (req, res) => {
  const trapId = req.params.trap_id;

  const requestForTrap = {
    trap_id: trapId,
    created_at: new Date().toLocaleString('en-US'),
    remote_ip: req.ip,
    method: req.method,
    scheme: req.protocol,
    body: req.body,
    query_params: req.query,
    cookies: req.cookies,
    headers: req.headers,
  };

  TrapModel.create(requestForTrap, (err, trap) => {
    if (err) res.status(500).json({ status: 500, message: err.message });

    req.app.io.in(trapId).emit('catched', requestForTrap);
    res.status(201).json({ status: 201, message: `${trap.trap_id} has created` });
  });
};

exports.show = (req, res) => {
  TrapModel
    .find({ trap_id: req.params.trap_id })
    .sort([['created_at', 'descending']])
    .lean()
    .exec((err, requests) => {
      if (err) res.send(err);

      res.render('traps/show', {
        title: 'Show trap',
        trap_id: req.params.trap_id,
        requests,
      });
    });
};
