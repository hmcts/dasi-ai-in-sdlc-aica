import { Router } from "express";
import { FactAPI } from "../factAPI";

const router = Router();
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/search-option", (req, res) => {
  res.render("search/option");
});

router.post("/search-option", (req, res) => {
  const { "court-or-tribunal": courtOrTribunal } = req.body;

  if (courtOrTribunal === "yes") {
    res.redirect("/search-by-name");
  } else if (courtOrTribunal === "no") {
    res.redirect("/service-choose-action");
  } else {
    res.redirect("/services/search-by-postcode");
  }
});

router.get("/search-by-name", (req, res) => {
  res.render("search/location");
});

router.get("/service-choose-action", (req, res) => {
  res.render("choose-action");
});

router.post("/service-choose-action", (req, res) => {
  const { action } = req.body;

  const validActions = ["nearest", "documents", "update", "not-listed"];
  if (validActions.includes(action)) {
    res.redirect(`/services/${action}`);
  } else {
    res.redirect("/service-choose-action");
  }
});

router.get("/courts", async (req, res) => {
  const courtOrTribunalName = String(req.query["court-or-tribunal-name"]);

  if (!courtOrTribunalName) {
    return res.render("search/location", {
      error: {
        title: "There is a problem",
        text: "Enter a court name, address, town or city",
      },
    });
  } else if (courtOrTribunalName.length < 3) {
    return res.render("search/location", {
      error: {
        title: "There is a problem",
        text: "Search must be 3 characters or more",
      },
    });
  }

  try {
    const courts = await FactAPI.getCourts(courtOrTribunalName);
    res.render("search/location", { courts });
  } catch (error) {
    res.render("search/location", {
      error: {
        title: "There is a problem",
        text: error.message,
      },
    });
  }
});

router.get("/courts/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const courtDetails = await FactAPI.getCourtBySlug(slug);

      // @ts-expect-error no typing used
    courtDetails.title = `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`;
    // @ts-expect-error no typing used
    courtDetails.image_file = `https://factaat.blob.core.windows.net/images/${courtDetails.image_file}`;

      // @ts-expect-error no typing used
    if (courtDetails.service_centre?.intro_paragraph) {
      // @ts-expect-error no typing used
      courtDetails.notInPersonP1 = courtDetails.service_centre.intro_paragraph;
    } else {
      // @ts-expect-error no typing used
      courtDetails.notInPersonP1 = `This location services all of England and Wales for ${courtDetails.areas_of_law.map((a: unknown) => a.name).join(", ")}. We do not provide an in-person service.`;
    }

    if (courtDetails.in_person) {
      res.render("court-details/in-person-court", courtDetails);
    } else {
      res.render("court-details/not-in-person-court", courtDetails);
    }
  } catch (error) {
    res.render("error", {
      error: {
        title: "There is a problem",
        text: error.message,
      },
    });
  }
});

export default router;
