import axios from "axios";
import rateLimit from "axios-rate-limit";
import axiosRetry from 'axios-retry';

 /** base url to make requests to the movie database */
const instance = rateLimit(axios.create({
  baseURL: "https://api.themoviedb.org/3",
  }), 
  {
    maxRequests: 50,
    perMilliseconds: 1000
  }
);

// Retries the API call if there are failed requests 
axiosRetry(instance, { 
  retries: 3, 
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
  retryCondition: axiosRetry.isRetryableError
});

export default instance; // default allows us to name it to anything in other files
