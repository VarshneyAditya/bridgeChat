import https from "https";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const { ELASTIC_USER, ELASTIC_PASSWORD } = process.env;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const authString = Buffer.from(`${ELASTIC_USER}:${ELASTIC_PASSWORD}`).toString(
  "base64"
);
const search = async (req, res) => {
  try {
    const response = await axios.get(
      "https://localhost:9200/type_search/_search",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        httpsAgent,
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from Elasticsearch" });
  }
};

export { search };
