// controllers/branchController.js
const Branch = require('../models/branch');

// Function to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Controller function to find nearest branches
const findNearestBranches = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const branches = await Branch.find();

    const branchesWithDistance = branches.map(branch => {
      const distance = calculateDistance(
        parseFloat(latitude), 
        parseFloat(longitude), 
        branch.latitude, 
        branch.longitude
      );
      return { ...branch.toObject(), distance };
    });

    // Sort by distance and limit to top 5
    branchesWithDistance.sort((a, b) => a.distance - b.distance);
    const top5Branches = branchesWithDistance.slice(0, 5);

    res.json(top5Branches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branches' });
  }
};

module.exports = { findNearestBranches };
