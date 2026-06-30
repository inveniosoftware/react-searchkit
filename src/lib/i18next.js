// This file is part of React-Searchkit
// Copyright (C) 2021 Graz University of Technology.
//
// React-Searchkit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React from "react";
import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { translations } from "./translations/messages";
import { Trans as ReactTrans } from "react-i18next";

const options = {
  fallbackLng: "en", // fallback keys
  returnEmptyString: false,
  debug: process.env.NODE_ENV === "development",
  resources: translations,
  keySeparator: false,
  nsSeparator: false,
  // specify language detection order
  detection: {
    order: ["htmlTag"],
    // cache user language off
    caches: [],
  },
  react: {
    // Set empty - to allow html tags convert to trans tags
    // HTML TAG | Trans TAG
    //  <span>  | <1>
    transKeepBasicHtmlNodesFor: [],
  },
};
// i18next instance creation
// https://www.i18next.com/overview/api#instance-creation
// this is required in order to keep the resources seperate
// if there is going to be another package
// which requires translation this is the way to create a new instance.
//
// We can use this particular instance for this particular package
// to mark strings for translation.
const i18next = i18n.createInstance();
i18next.use(LanguageDetector).init(options);

// Bind Trans component to i18next instance
export const Trans = (props) => <ReactTrans i18n={i18next} {...props} />;

export { i18next };
