import { MovieCard } from "../components/movieCard";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
//jest.mock("../components/movieCard.module.css", () => ({}));
describe("pruebas componente MovieCard", () => {
  it("prueba uno", () => {
    render(<MovieCard />);
  });
});
