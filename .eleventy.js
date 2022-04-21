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
    // Return your Object options:
    return {
      pathPrefix: "/lepekhin.art/",
      dir: {
        input: "src",
        output: "docs"
      }
    }
  };