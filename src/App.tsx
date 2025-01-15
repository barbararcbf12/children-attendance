import React from "react";
import Header from "./components/Header/Header";
import ChildrenGrid from "./components/ChildrenGrid/ChildrenGrid";

function App() {
  return (
    <div className="space-y-3 h-dvh">
      <Header />
      <main className="p-6 w-full flex justify-center">
        <ChildrenGrid />
      </main>
    </div>
  );
}

export default App;
