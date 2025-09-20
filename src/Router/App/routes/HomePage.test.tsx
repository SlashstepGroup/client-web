import {render, screen} from '@testing-library/react'
import '@testing-library/dom'
import "@testing-library/jest-dom"
import HomePage from './HomePage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

describe("HomePage", () => {

  it("renders without crashing", () => {

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route element={<HomePage setHeaderTitle={() => null} setFallbackBackPathname={() => null} />} />
      )
    );

    render(<RouterProvider router={router} />);

  });

  it("sets the mobile header title", () => {

    const setHeaderTitle = jest.fn();

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<HomePage setHeaderTitle={setHeaderTitle} setFallbackBackPathname={() => null} />} />
      )
    );

    render(<RouterProvider router={router} />);

    expect(setHeaderTitle).toHaveBeenCalledWith(expect.any(String));

  });

  it("resets the fallback path for the back button", () => {

    const setFallbackBackPathname = jest.fn();

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<HomePage setHeaderTitle={() => null} setFallbackBackPathname={setFallbackBackPathname} />} />
      )
    );

    render(<RouterProvider router={router} />);

    expect(setFallbackBackPathname).toHaveBeenCalledWith(null);

  });

});