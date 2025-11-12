import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { PeopleCard } from "../../../src/presentation/components/PeopleCard";

describe("PeopleCard", () => {
  it("muestra el nombre y el género de la persona", () => {
    const mockPerson = { id: 1, name: "Luke Skywalker", gender: "male" };
    render(<PeopleCard people={mockPerson as any} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();   
    expect(screen.getByText(/male/i)).toBeInTheDocument();   
  });
});
