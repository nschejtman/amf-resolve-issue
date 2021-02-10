const amf = require('amf-client-js');
const fs = require('fs-extra');

amf.plugins.document.WebApi.register();
amf.plugins.document.Vocabularies.register();
amf.plugins.features.AMFValidation.register();

(async () => {

  const model = await fs.readFile('./file.json', 'utf-8');
  const type = 'RAML 1.0';
  await amf.Core.init();

  try {
    const parser = amf.Core.parser('AMF Graph', 'application/ld+json');
    console.log('Parsing unresolved model');
    const doc = await parser.parseStringAsync(model);

    const resolver = amf.Core.resolver(type);
    console.log('Resolving model using editing pipeline');
    const resolvedDoc = resolver.resolve(doc, 'editing');
    
    const generator = amf.Core.generator('AMF Graph', 'application/ld+json');
    const opts = amf.render.RenderOptions().withSourceMaps.withCompactUris;
    console.log('Generating console ready model');
    const str = generator.generateString(resolvedDoc, opts);
    console.log(str);
  } catch (e) {
    console.error(e.message || e.toString());
    console.error(e);
  }

})();
