import axios from "axios";
import * as axiosRetry from 'retry-axios';
// import rateLimit from "axios-rate-limit";

 /** base url to make requests to the movie database */
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
  }
);

// Retries the API call if there are failed requests 
axiosInstance.defaults.retryConfig = {
	retryConfig: {
		retry: 5, // number of retries when facing 4xx or 5xx
		noResponseRetries: 5, // number of retry when facing connection error
		instance: axiosInstance,
		onRetryAttempt: err => {
			const cfg = axiosRetry.getConfig(err);
			console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
		}
	},
	timeout: 50 // milliseconds
}

axiosRetry.attach(axiosInstance);

//  const instance = rateLimit(axios.create({
//   baseURL: "https://api.themoviedb.org/3"
//   }), 
//   {
//     maxRequests: 45,
//     perMilliseconds: 1100
//   }
// );

export default axiosInstance; // default allows us to name it to anything in other files
