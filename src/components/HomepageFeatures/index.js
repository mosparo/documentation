import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

import documentationImageUrl_1x from '@site/static/img/front/notepad.png';
import documentationImageUrl_2x from '@site/static/img/front/notepad@2x.png';
import documentationImageUrl_3x from '@site/static/img/front/notepad@3x.png';

import translationImageUrl_1x from '@site/static/img/front/translations.png';
import translationImageUrl_2x from '@site/static/img/front/translations@2x.png';
import translationImageUrl_3x from '@site/static/img/front/translations@3x.png';

import testingImageUrl_1x from '@site/static/img/front/testing.png';
import testingImageUrl_2x from '@site/static/img/front/testing@2x.png';
import testingImageUrl_3x from '@site/static/img/front/testing@3x.png';
import Translate from "@docusaurus/Translate";


const FeatureList = [
  {
    title: <Translate>Documentation</Translate>,
    img: {
        one: documentationImageUrl_1x,
        two: documentationImageUrl_2x,
        three: documentationImageUrl_3x,
    },
    description: (
      <Translate>
        Read how to install, how to use and how to integrate mosparo into your website.
      </Translate>
    ),
    linkTo: '/docs/category/about'
  },
  {
    title: <Translate>Translating</Translate>,
    img: {
        one: translationImageUrl_1x,
        two: translationImageUrl_2x,
        three: translationImageUrl_3x,
    },
    description: (
      <Translate>
        You want to help to translate mosparo? Here you can find all informations about it.
      </Translate>
    ),
    linkTo: '/docs/translating'
  },
  {
      title: <Translate>Testing</Translate>,
    img: {
        one: testingImageUrl_1x,
        two: testingImageUrl_2x,
        three: testingImageUrl_3x,
    },
    description: (
      <Translate>
        Testing is important to ensure a good software quality. Help us with testing to improve mosparo.
      </Translate>
    ),
    linkTo: '/docs/testing'
  },
];

function Feature({img, title, description, linkTo}) {
  return (
    <div className={clsx('col col--4 feature-box')}>
      <div className="text--center">
        <img src={img.one} srcSet={`${img.one} 1x, ${img.two} 2x, ${img.three} 3x`} className={styles.featureSvg} role="img" alt="" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link
          className="button button--primary button--lg"
          to={linkTo}>
          <Translate>
            Continue
          </Translate>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
