import connectdb from "../database/connectdb.js";
import { schoolSchema } from "../validation/schoolValidation.js";

//  Add School
export const addSchool = async (req, res) => {
  try {
    const { error } = schoolSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, address, latitude, longitude } = req.body;

    await connectdb.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error in addSchool:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// List Schools (sorted by distance)
export const listSchools = async (req, res) => {
  try {
    let { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // Convert query params to numbers
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    //  use connectdb (same as addSchool)
    const [schools] = await connectdb.query("SELECT * FROM schools");

    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371; // Earth radius (km)

    const enriched = schools.map((s) => {
      const dLat = toRad(s.latitude - latitude);
      const dLon = toRad(s.longitude - longitude);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(latitude)) *
        Math.cos(toRad(s.latitude)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return { ...s, distance_km: parseFloat(distance.toFixed(2)) };
    });

    enriched.sort((a, b) => a.distance_km - b.distance_km);
    res.json(enriched);
  } catch (err) {
    console.error("Error in listSchools:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
