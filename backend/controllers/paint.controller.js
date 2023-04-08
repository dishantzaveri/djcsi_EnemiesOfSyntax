import asianPaintsCalculator from '../utils/scrapeAsianPaints.js';

export const getAsianPaintsCost = async (req, res) => {
  try {
    const { typeOfProject, paintSpacing, homeSize, carpetArea } = req.body;

    const result = await asianPaintsCalculator(typeOfProject, paintSpacing, homeSize, carpetArea);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
