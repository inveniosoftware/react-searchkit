/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Layout from "@theme/Layout";
import React from "react";

const supportLinks = [
  {
    content: (
      <>
        Have a look to the{" "}
        <a href="/react-searchkit/docs/getting-started">Getting Started guide</a>{" "}
        to better understand how React-SearchKit works and how it can help you to
        build your own SearchKit app.
        <br />
        <br />
        Read the{" "}
        <a href="/react-searchkit/docs/main-concepts">advanced guide</a> to know
        how to customize, extend and create your own components.
      </>
    ),
    title: "Browse the documentation",
  },
  {
    content: (
      <>
        Join the{" "}
        <a href="https://discord.gg/8qatqBC" target="_blank" rel="noopener noreferrer">
          Invenio Discord channel
        </a>{" "}
        to ask questions and get help.
      </>
    ),
    title: "Join the community",
  },
  {
    content: (
      <>
        React-SearchKit is part of the Invenio software organization.
        <ul>
          <li>
            Have a look to the{" "}
            <a href="https://inveniosoftware.org/" target="_blank" rel="noopener noreferrer">
              Invenio
            </a>{" "}
            website to know more about the project.
          </li>
          <li>
            Announcements and news are published in the official{" "}
            <a href="https://inveniosoftware.org/blog/" target="_blank" rel="noopener noreferrer">
              Invenio blog
            </a>.
          </li>
          <li>
            Follow Invenio on{" "}
            <a href="https://twitter.com/inveniosoftware" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>.
          </li>
        </ul>
      </>
    ),
    title: "Stay up to date",
  },
];

function SupportCard({ title, content }) {
  return (
    <div className="col col--4">
      <div className="card margin--md">
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">{content}</div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Layout title="Help" description="Get help with React-SearchKit">
      <div className="container margin-vert--lg">
        <div className="text--center margin-bottom--lg">
          <h1>Need help?</h1>
        </div>
        <p className="text--center">
          React-SearchKit is born at{" "}
          <a href="https://home.cern" target="_blank" rel="noopener noreferrer">
            CERN
          </a>
          . It is under active development and used by websites built on top of{" "}
          <a href="https://inveniosoftware.org/" target="_blank" rel="noopener noreferrer">
            Invenio
          </a>.
        </p>
        <div className="row margin-top--lg">
          {supportLinks.map((props, idx) => (
            <SupportCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
