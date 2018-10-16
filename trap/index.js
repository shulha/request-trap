exports.create = (req, res) => {
  res.render('traps/create', {
    title: 'Create trap',
    trap_id: req.params.trap_id,
  });
};

exports.show = (req, res) => {
  res.render('traps/show', {
    title: 'Show trap',
    trap_id: req.params.trap_id,
  });
};
