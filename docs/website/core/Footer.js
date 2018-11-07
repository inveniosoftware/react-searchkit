/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

const React = require('react');

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Made with</h5>
            <a href="https://docusaurus.io/">Docusaurus</a>
            <a
              href="https://code.facebook.com/projects/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`${siteConfig.baseUrl}img/oss_logo.png`}
                alt="React-SearchKit"
                width="170"
                height="45"
              />
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/inveniosoftware/react-searchkit">
              GitHub
            </a>
            <a href="https://inveniosoftware.org/">Invenio Software</a>
            <a href="https://gitter.im/inveniosoftware/invenio">
              <img
                src={`${siteConfig.baseUrl}img/gitter.svg`}
                alt="Gitter chat"
              />
            </a>
            <a href="https://twitter.com/inveniosoftware">Twitter</a>
          </div>
          <div>
            <h5>Born with ❤️ at</h5>
            <a href="https://home.cern/" target="_blank">
              <img
                src={`${siteConfig.baseUrl}img/logo-cern.png`}
                alt="CERN"
                width="130"
              />
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
