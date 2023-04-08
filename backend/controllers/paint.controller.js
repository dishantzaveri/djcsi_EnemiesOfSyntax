import getAsianPaints from '../utils/asianPaints.js';
import asianPaintsCalculator from '../utils/asianPaintsCalculator.js';

export const getAsianPaintsCost = async (req, res) => {
  try {
    const { typeOfProject, paintSpacing, homeSize, carpetArea } = req.body;

    const result = await asianPaintsCalculator(typeOfProject, paintSpacing, homeSize, carpetArea);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAsianPaintsController = async (req, res) => {
  try {
    const data = await getAsianPaints();

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
