import { render } from '@testing-library/react'
import '@testing-library/dom'
import "@testing-library/jest-dom"
import HomePage from './HomePage';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

describe("HomePage", () => {

  it("renders without crashing", () => {

    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route element={<HomePage setHeaderTitle={() => null} setFallbackBackPathname={() => null} />} />
      )
    );

    render(<RouterProvider router={router} />);

  });

  it("sets the mobile header title", () => {

    const setHeaderTitle = jest.fn();

    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route path="/" element={<HomePage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={() => null} />} />
      )
    );

    render(<RouterProvider router={router} />);

    expect(setHeaderTitle).toHaveBeenCalledWith(expect.any(String));

  });

  it("resets the fallback path for the back button", () => {

    const setFallbackBackPathname = jest.fn();

    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route path="/" element={<HomePage setHeaderTitle={() => null} setFallbackBackPathname={setFallbackBackPathname} />} />
      )
    );

    render(<RouterProvider router={router} />);

    expect(setFallbackBackPathname).toHaveBeenCalledWith(null);

  });

  it("redirects to the Overview page if the viewport is at least 400px wide when the page first loads", () => {

    const setFallbackBackPathname = jest.fn();

    const router = createMemoryRouter(
      createRoutesFromElements(
        <Route path="/" element={<HomePage setHeaderTitle={() => null} setFallbackBackPathname={setFallbackBackPathname} />} />
      )
    );

    global.innerWidth = 400;

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toBe("/overview");

  });

});