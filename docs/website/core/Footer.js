/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
            <div>
                <h5>Made with</h5>
                <a href="https://docusaurus.io/">Docusaurus</a>
                <a href="https://code.facebook.com/projects/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="fbOpenSource">
                  <img
                    src={`${this.props.config.baseUrl}img/oss_logo.png`}
                    alt="Facebook Open Source"
                    width="170"
                    height="45"
                  />
                </a>
            </div>
            <div>
                <h5>More</h5>
                <a href="https://github.com/inveniosoftware/react-searchkit">GitHub</a>
                <a
                  className="github-button"
                  href={this.props.config.repoUrl}
                  data-icon="octicon-star"
                  data-show-count="true"
                  data-count-aria-label="# stargazers on GitHub"
                  aria-label="Star this project on GitHub">
                  Star
                </a>
            </div>
            <div>
                <h5>Made at</h5>
                <a href="https://cern.ch/" target="_blank">
                      <img
                        src={`${this.props.config.baseUrl}img/CERN-Logo.png`}
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
