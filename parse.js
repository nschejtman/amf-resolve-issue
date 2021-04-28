const amf = require('amf-client-js');
const fs = require('fs-extra');
const path = require('path');

amf.plugins.document.WebApi.register();
amf.plugins.document.Vocabularies.register();
amf.plugins.features.AMFValidation.register();

(async () => {
  await amf.Core.init();

  const sourceFile = path.join(__dirname, 'covid19-data-tracking-api', 'covid-data-tracking-api.raml'); // .replace(/\\/g, '/');
  const type = 'RAML 1.0';
  const contentType = 'application/raml';

  const file = `file://${sourceFile}`;
  
  try {
    const parser = amf.Core.parser(type, contentType);
    const doc = await parser.parseFileAsync(file);

    const generator = amf.Core.generator('AMF Graph', 'application/ld+json');
    const opts = amf.render.RenderOptions().withSourceMaps.withCompactUris.withPrettyPrint;
    const unresolved = await generator.generateString(doc, opts);
    await fs.writeFile(`dumped-{JS}-{${process.platform}}.jsonld`, unresolved, 'utf-8');
    console.log('File ready');
  } catch (e) {
    console.error(e.message || e.toString());
    console.error(e);
  }

})();
