// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const response = await axios.post(
//       "https://bromotenggersemeru.id/website/home/combo",
//       req.body,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "X-Requested-With": "XMLHttpRequest",
//         },
//       }
//     );
//     res.status(200).send(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


// api/combo.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://bromotenggersemeru.id/website/home/combo", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
