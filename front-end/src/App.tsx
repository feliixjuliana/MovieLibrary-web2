import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieLibrary from './views/movieLibrary';
import FilmForm from './views/filmForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieLibrary />} />
        <Route
          path="/filmform/new"
          element={
            <FilmForm
              filmToEdit={null}
              onFormSubmit={() => {}}
              onCancel={() => {}}
            />
          }
        />
        <Route
          path="/filmform/:id"
          element={
            <FilmForm
              filmToEdit={null}
              onFormSubmit={() => {}}
              onCancel={() => {}}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;