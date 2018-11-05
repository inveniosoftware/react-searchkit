const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Home extends React.Component {
  render() {
    return <div>
      <Container
        padding={['all']}
        background="light"
        className="myCustomClass">
        <GridBlock
          align="center"
          layout="oneColumn"
          contents={[
            {
              title: `React SearchKit`,
              content: 'A simple yet powerful kit for your search app',
            }
          ]}
        />
    </Container>
    <GridBlock
      align="center"
      layout="threeColumn"
      contents={[
        {
          title: `[Learn](${siteConfig.baseUrl}docs/tutorial.html)`,
          content: 'Learn how to use this project',
        },
        {
          title: 'Frequently Asked Questions',
          content: 'Questions gathered from the community',
        },
        {
          title: 'More',
          content: 'Lots of documentation is on this site',
        },
      ]}
    />
    </div>;
  }
}

module.exports = Home;
