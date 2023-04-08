import Host from '../models/Host.js';

/* CREATE */
export const createHost = async (req, res) => {
  try {
    const hostParams = { ...req.body };

    const newHost = new Host(hostParams);

    await newHost.save();

    res.status(201).json(newHost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getHosts = async (req, res) => {
  try {
    const post = await Host.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const updateHost = async (req, res) => {
  try {
    const { id } = req.params;
    const { hostUpdate } = req.body;

    const updatedPost = await Host.findByIdAndUpdate(id, hostUpdate);

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteHost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Host.findByIdAndDelete(id);

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
