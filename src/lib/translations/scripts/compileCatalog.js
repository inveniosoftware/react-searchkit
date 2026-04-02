// This file is part of React-Searchkit
// Copyright (C) 2021 Graz University of Technology.
//
// React-Searchkit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

const { readFileSync, writeFileSync } = require("fs");
const { gettextToI18next } = require("i18next-conv");
const { languages } = require("../../../../package").config;

// it accepts the same options as the cli.
// https://github.com/i18next/i18next-gettext-converter#options
const options = {
  /* you options here */
};

function save(target) {
  return (result) => {
    writeFileSync(target, result);
  };
}

if ("lang" === process.argv[2]) {
  const lang = process.argv[3];
  gettextToI18next(
    lang,
    readFileSync(`src/lib/translations/messages/${lang}/messages.po`),
    options
  ).then(save(`src/lib/translations/messages/${lang}/translations.json`));
} else {
  for (const lang of languages) {
    gettextToI18next(
      lang,
      readFileSync(`src/lib/translations/messages/${lang}/messages.po`),
      options
    ).then(save(`src/lib/translations/messages/${lang}/translations.json`));
  }
}
