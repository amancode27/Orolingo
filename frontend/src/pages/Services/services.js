import React from 'react';
import './services.scss';
import { lorem } from 'faker';

const services = [
  { header: '1. Responsive Web Design', body: lorem.words(20) },
  { header: '2. UX Auditing', body: lorem.words(30) },
  { header: '3. Front End Development', body: lorem.words(40) },
  { header: '4. UX Consultation', body: lorem.words(20) },
  { header: '5. Mobile App Design', body: lorem.words(25) },
  { header: '6. UX Research', body: lorem.words(30) }
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
