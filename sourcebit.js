const _ = require("lodash");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-filesystem"),
      options: {
        watch: isDev,
      },
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: true,
        pages: [
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "landing"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "oldLanding"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "blog"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty(
              "__metadata.modelName",
              "notifications"
            ),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "page"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "post"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "series"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "stories"),
          },
          {
            path: "/{__metadata.urlPath}",
            predicate: _.matchesProperty("__metadata.modelName", "story"),
          },
        ],
        commonProps: {
          pages: {
            predicate: _.matchesProperty("__metadata.modelType", "page"),
          },
          data: {
            single: true,
            predicate: _.matchesProperty(
              "__metadata.id",
              "sourcebit-source-filesystem:data"
            ),
          },
        },
      },
    },
  ],
};
