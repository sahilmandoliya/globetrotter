"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaces } from "../redux/slices/placesSlices";

export default function ClientProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return <>{children}</>;
}
