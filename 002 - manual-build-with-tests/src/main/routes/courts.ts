import { FactAPI } from '../factAPI';
import { ClosedCourtDetail, CourtsRequest, CourtsResponsePayload, OpenCourtDetail } from '../types/dtos';

import { Router } from 'express';

const router = Router();

router.get<unknown, unknown, unknown, CourtsRequest>('/', async (req, res) => {
  const {
    query: { search },
  } = req;
  const data: CourtsResponsePayload = {
    results: [],
    search,
  };

  if (!search) {
    data.error = {
      title: 'There is a problem',
      text: 'Enter a court name, address, town or city',
    };
  } else if (search && search.length < 3) {
    data.error = {
      title: 'There is a problem',
      text: 'Search must be 3 characters or more',
    };
  } else {
    const courts = await FactAPI.findCourtByNameOrAddressOrPostcodeOrTown(search);
    const total = courts?.length ?? 0;

    if (total > 0) {
      data.results = courts;
      data.foundResults = `We found 1 court or tribunal matching your search for '${search}'.`;
      if (total > 1) {
        data.foundResults = `We found ${total} courts or tribunals matching your search for '${search}'.`;
      }
    }

    data.courtHistory = await FactAPI.getCourtByCourtHistoryNameSearch(search);
    //forcing english (en) because we will not always have welsh history in db
  }
  res.render('search/location', data);
});

export interface CourtDetailParams {
  slug: string | undefined;
}

router.get<CourtDetailParams>('/:slug', async (req, res, next) => {
  const {
    params: { slug },
  } = req;

  if (!slug) {
    next();
    return;
  }

  const courtDetails = await FactAPI.findCourtByName(slug);

  if (!courtDetails) {
    next();
    return;
  }

  if (courtDetails.open) {
    const viewData: OpenCourtDetail = {};
    viewData.title = `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`;
    courtDetails.image_file = `https://factaat.blob.core.windows.net/images/${courtDetails.image_file}`;
    viewData.results = courtDetails;

    if (courtDetails.in_person) {
      return res.render('court-details/in-person-court', viewData);
    }

    if (courtDetails.service_centre?.intro_paragraph?.length) {
      viewData.notInPersonP1 = courtDetails.service_centre.intro_paragraph;
    } else {
      viewData.notInPersonP1 = `This location services all of England and Wales for ${courtDetails.areas_of_law.map(a => a.name).join(', ')}. We do not provide an in-person service.`;
    }

    return res.render('court-details/not-in-person-court', viewData);
  }

  const detail: ClosedCourtDetail = {};
  detail.title = `${courtDetails.name} - Find a Court or Tribunal - GOV.UK`;
  detail.name = courtDetails.name;
  return res.render('court-details/closed-court', detail);
});

export default router;
