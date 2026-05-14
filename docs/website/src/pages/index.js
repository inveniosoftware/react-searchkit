/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
          <Link
            className={`button button--secondary button--lg ${styles.buttonOutline}`}
            to="/docs/components/react-searchkit"
          >
            Discover components
          </Link>
        </div>
        <div className={styles.githubStar}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=inveniosoftware&repo=react-searchkit&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="170"
            height="30"
            title="GitHub Star Button"
          />
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: "Ready To Use",
    description: (
      <>
        Compose your search UI choosing between any of the available components.
        Override the default look and feel of each component and provide yours.
      </>
    ),
  },
  {
    title: "Fully Configurable",
    description: (
      <>
        Use React-SearchKit with your search REST API endpoint or OpenSearch by
        providing your configuration or implementation. Customize deep linking
        and integrate with React Router.
      </>
    ),
  },
  {
    title: "Extensible",
    description: (
      <>
        Create new components in a simple way and plug them to the other already
        available ones.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className="col col--4">
      <div className={`${styles.card} text--center padding--md`}>
        <div className={styles.cardBody}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageScreenshot() {
  const screenshotUrl = useBaseUrl("img/screenshot.png");
  return (
    <section className={styles.screenshot}>
      <div className="container text--center">
        <img src={screenshotUrl} alt="Screenshot" width="700" />
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A simple yet powerful UI search kit built with React"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageScreenshot />
      </main>
    </Layout>
  );
}
