import logger from "../../logger";
import { getMostAndLeastVisitedList } from "../helpers/getMostAndLeastVisited";

export default ({
  getRetrieveFacilitiesBookedVisitTotalsByOrgIdGateway,
  }) => async (orgId) => {
    try {
      if (orgId === undefined) {
        return { 
          facilities: null, 
          mostVisitedList: null,
          leastVisitedList: null, 
          error: "organisation id must be provided." };
      }
      logger.info(`Retrieving total booked visits for facilities by orgaisation id ${orgId}`);
      var facilities = await getRetrieveFacilitiesBookedVisitTotalsByOrgIdGateway()(orgId);
      const { mostVisitedList, leastVisitedList} = getMostAndLeastVisitedList(facilities, 3)
      return { facilities, mostVisitedList, leastVisitedList, error: null };
     
    } catch (error) {
      return {
        facilities: null,
        mostVisitedList: null,
        leastVisitedList: null,
        error: "There has been error retrieving hospital visit totals",
      };
    }
  };
  