import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column text-center">
      <h1 className="text-lg-center text-danger display-1">404</h1>
      <p>Страница не найдена</p>
      <Link to="/">На главную</Link>
    </div>
  )
}
