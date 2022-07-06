Assume that we have the project structure looks like this:
```js
+ clients
  - s3-client.js
+ models
  - registration-model.js
+ services
  - document-service.js
  - ocr-service.js
  - registration-service.js
```
Document service implementation.
```js
// /services/document-service.js
const ocrService = require('./ocr-service');
const registrationService = require('./registration-service');
const s3Client = require('../clients/s3-client');
/**
 * @param {string} identifier
 * @param {string} type
 * @param {string} blob
 * @result {string}
 */
async function store(identifier, type, blob) {
  const localURL;
  try {
    localURL = await s3Client.save(
      identifier,
      type,
      blob,
    );
  } catch (error) {
    throw error; 
  }
  return localURL;
}
/**
 * @param {string} blob
 * @return {boolean}
 */
async function storeIdentityCard(blob) {
  const localURL;
  try {
    const data = ocrService.parseIdentityCard(blob);
    localURL = await store(
      data.icNumber,
      'IDENTITY_CARD',
      blob,
    );
    // [MARK1] PAY ATTENTION TO THIS
    await registrationService.register(
      {
        fullname: data.fullname,
        icNumber: data.icNumber,
      },
      data.photoBLOB,
    );
} catch (error) {
    throw error; 
  }
  return localURL;
}
module.exports = {
  store,
  storeIdentityCard,
};
```
Registration service implementation.

```js
// /services/registration.service.js
const documentService = require('./document-service);
const registrationModel = require('../models/registration-model');
/**
 * @param {object} data
 * @param {string} data.fullname
 * @param {string} data.icNumber
 * @param {string} photoBLOB
 * @return {boolean}
 */
async function register(data, photoBLOB) {
  try {
    await registrationModel.create(data);
    // [MARK2] PAY ATTENTION TO THIS
    await documentService.store(
      data.icNumber,
      {
        type: 'PHOTO',
        url: photoURL,
      },
    );
  } catch (error) {
    throw error;
  }
  return true;
}
module.exports = {
  register,
};
```
When the storeIdentityCard() method is called, it fails with the following error:
```js
documentService.store is not a function
```
If we closely look at document-service.js and registration-service.js, they’re both referencing each other causing a circular dependency between them.

We can explain the control flow this way:

1. document-service.js is loaded: During the loading process, several modules are imported. One of them is registration-service.js, which then forces the engine to load this module.
2. registration-service.js is loaded: During the loading process, several modules are imported. One of them is again the document-service.js. At this point, the engine uses the as-yet unfilled exports (think {}) of the document-service.js module here.
3. registration-service.js is fully loaded.
4. document-service.js is fully loaded.
5. storeIdentityCard() of document-service.js is called. By the time registrationService.register() (see [MARK1] tag) is called, it will throw documentService.store is not a function (see [MARK2] tag). This happens because documentService is an empty object.

## Conclusion 
A circular dependency is not necessarily a bad thing and may be useful in some cases. However, if possible, it is best to avoid it as it cause bugs that are hard to reason with.