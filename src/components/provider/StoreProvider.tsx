"use client";
import React from "react";
import { Provider } from "react-redux";
import { store} from "@/lib/redux/store";
import { persistStore } from "redux-persist";
persistStore(store)
interface Props {
  children: React.ReactNode;
}
export default function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
