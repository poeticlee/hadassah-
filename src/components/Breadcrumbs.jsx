import { Link } from 'react-router-dom'

export default function Breadcrumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <li key={item.to}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {!last ? <span className="crumbs__sep" aria-hidden="true">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
