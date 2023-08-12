export const handleException = (e, res) => {
  if (e.statusCode) {
    res.status(e.statusCode).json(e);
  } else {
    res.status(500).json({ error: e });
  }
}
