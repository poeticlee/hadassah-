import { Link } from 'react-router-dom'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  as: Tag = 'h2',
  id,
  link,
}) {
  return (
    <div className={`section-head section-head--${align}`} data-reveal>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag className="section-head__title" id={id}>
        {title}
      </Tag>
      {intro ? <p className="section-head__intro">{intro}</p> : null}
      {link ? (
        <p className="section-head__link">
          <Link className="link-arrow" to={link.to}>
            {link.label} <span aria-hidden="true">→</span>
          </Link>
        </p>
      ) : null}
    </div>
  )
}
