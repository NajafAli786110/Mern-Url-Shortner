import { nanoid } from "nanoid";
import Url from "../model/Url.js";

async function handleGenerateNewUrl(req, res) {
  const newNanoidId = nanoid(8);
  const newUrl = req.body;

  if (!newUrl.redirectURL)
    return res.status(400).json({
      message: "Url is Required",
    });

  try {
    const URL = await Url.create({
      ShortId: newNanoidId,
      redirectURL: newUrl.redirectURL,
      visitHistory: [],
      createdBy: req.currUser._id,
    });
    res.render("home", { id: newNanoidId });
  } catch (error) {
    console.log(error, "This is your error");
  }
}

async function handleRedirects(req, res) {
  try {
    const id = req.params.id;
    const data = await Url.findOneAndUpdate(
      {
        ShortId: id,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!data) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.redirect(data.redirectURL);
  } catch (error) {
    res.status(400).json({ message: `Error comes: ${error}` });
  }
}

async function handleUrlAnalytics(req, res) {
  try {
    const id = req.params.id;
    const findUrl = await Url.findOne({ ShortId: id });
    if (!findUrl) {
      return res.status(400).json({ message: "Request Not Found!" });
    }
    const timeStampsData = findUrl.visitHistory.map((item) => item.timestamp);
    res.status(200).json({
      totalClicks: findUrl.visitHistory.length,
      timstamps: timeStampsData,
    });
  } catch (error) {
    res.status(400).json({ message: `Error comes: ${error}` });
  }
}

export { handleGenerateNewUrl, handleRedirects, handleUrlAnalytics };
