const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = [];
  const responseKey = "Arnie Quote"; // Note: Keys can be hardcoded, split out for better modifiability
  const failureKey = "FAILURE";

  const promises = urls.map(url => {
    return httpGet(url);
  })

  const handleSuccess = (resp) => {
    const result = {
      [responseKey]: JSON.parse(resp?.body).message,
    }; 
    results.push(result);
   }
  
   const handleError = (err) => {
    const result = {
      [failureKey]: JSON.parse(err?.body).message,
    };
    results.push(result);     
   }

  await Promise.all(promises).then(responses => {
    responses.forEach(resp => {
      if (resp.status == 200) {
        handleSuccess(resp);
      } else {
        handleError(resp);
      }
    })
  }); 

  return results;
};

module.exports = {
  getArnieQuotes,
};
