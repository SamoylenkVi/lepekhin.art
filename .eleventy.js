const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

    // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.load(contents)
  );

    eleventyConfig.addPassthroughCopy("./src/css/*")
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy("./src/js/*");

    eleventyConfig.addPassthroughCopy({ "./node_modules/@glidejs/glide/dist/css/glide.core.min.css": "css/vendor/glide.core.min.css" });
    eleventyConfig.addPassthroughCopy({ "./node_modules/@glidejs/glide/dist/css/glide.theme.min.css": "css/vendor/glide.theme.min.css" });
    eleventyConfig.addPassthroughCopy({ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js": "js/vendor/glide.js" });
    eleventyConfig.addPassthroughCopy({ "./node_modules/@glidejs/glide/dist/glide.min.js": "js/vendor/glide.min.js" });
    
    // Return your Object options:
    return {
      pathPrefix: "/lepekhin.art/",
      dir: {
        input: "src",
        output: "docs"
      }
    }
  };