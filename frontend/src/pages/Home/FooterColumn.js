import React from "react";

const FooterColumn = (props) => {
  return (
    <div className="footer--column">
      <h3 className="footer--header">{props.header}</h3>
      <ul>
        {props.items.map((e) => (
          <li className="footer--item">
            <a className="footer--link" href={e.link}>
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
