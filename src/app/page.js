"use client"
import Guess from "@/components/Guess/Guess";
import store from "@/redux/store";
import Image from "next/image";
import { Provider } from "react-redux";

export default function Home() {

  return (
    <Provider store={store}>
      <Guess />
    </Provider>
  );
}
