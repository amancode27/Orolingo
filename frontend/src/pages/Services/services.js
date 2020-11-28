import React from 'react';
import './services.scss';
import { lorem } from 'faker';

const services = [
  { header: '1. Best of Trainers', body: lorem.words(20) },
  { header: '2. Affordable', body: lorem.words(30) },
  { header: '3. Live Interactive Classes', body: lorem.words(40) },
  { header: '4. Structured Courses Meeting the International Standards', body: lorem.words(20) },
  { header: '5. Anytime-Anywhere Access', body: lorem.words(25) },
  { header: '6. Financial Aid Available', body: lorem.words(30) }
];

function Service() {
  return (
    <ul className="services">
      {services.map((service, i) => (
        <li className="services__item" key={service.header}>
          <h3>{service.header}</h3>
          <p>{service.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Services() {
  return (
    <section className="section">
      <h2 className="section__title">
        <span>Our&nbsp;Services</span>
      </h2>
      <Service />
    </section>
  );
}
